// src/composables/useTMDB.ts
import axios from "axios";
import { ref } from "vue";

export function useTMDB() {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    const apiKey = user?.apiKey;

    const client = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: apiKey,
            language: "ko-KR",
        },
    });

    const loading = ref(false);
    const error = ref("");

    /* ---------------------------------------------------
     * TMDB 인기 영화
     * --------------------------------------------------- */
    async function getPopular(page = 1) {
        loading.value = true;
        try {
            const res = await client.get("/movie/popular", {
                params: { page },
            });
            return res.data;
        } catch (err) {
            error.value = "인기 영화를 불러오지 못했습니다.";
            return null;
        } finally {
            loading.value = false;
        }
    }

    /* ---------------------------------------------------
     * TMDB 현재 상영작
     * --------------------------------------------------- */
    async function getNowPlaying(page = 1) {
        loading.value = true;
        try {
            const res = await client.get("/movie/now_playing", {
                params: { page },
            });
            return res.data;
        } catch (err) {
            error.value = "현재 상영작 정보를 가져오지 못했습니다.";
            return null;
        } finally {
            loading.value = false;
        }
    }

    /* ---------------------------------------------------
     * TMDB 최고 평점 영화
     * --------------------------------------------------- */
    async function getTopRated(page = 1) {
        loading.value = true;
        try {
            const res = await client.get("/movie/top_rated", {
                params: { page },
            });
            return res.data;
        } catch {
            error.value = "최고 평점 영화를 가져오지 못했습니다.";
            return null;
        } finally {
            loading.value = false;
        }
    }

    /* ---------------------------------------------------
     * TMDB 개봉 예정작
     * --------------------------------------------------- */
    async function getUpcoming(page = 1) {
        loading.value = true;
        try {
            const res = await client.get("/movie/upcoming", {
                params: { page },
            });
            return res.data;
        } catch {
            error.value = "개봉 예정작을 불러오지 못했습니다.";
            return null;
        } finally {
            loading.value = false;
        }
    }

    /* ---------------------------------------------------
     * TMDB 검색
     * --------------------------------------------------- */
    async function searchMovies(query: string, page = 1) {
        loading.value = true;
        try {
            const res = await client.get("/search/movie", {
                params: { query, page },
            });
            return res.data;
        } catch {
            error.value = "영화 검색 중 문제가 발생했습니다.";
            return null;
        } finally {
            loading.value = false;
        }
    }

    /* ---------------------------------------------------
     * TMDB 상세 정보
     * --------------------------------------------------- */
    async function getMovieDetails(movieId: number) {
        loading.value = true;
        try {
            const res = await client.get(`/movie/${movieId}`);
            return res.data;
        } catch {
            error.value = "영화 상세 정보를 가져오지 못했습니다.";
            return null;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        error,
        getPopular,
        getNowPlaying,
        getTopRated,
        getUpcoming,
        searchMovies,
        getMovieDetails,
    };
}

