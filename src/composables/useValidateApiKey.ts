export async function validateApiKey(apiKey: string): Promise<boolean> {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;

    try {
        const res = await fetch(url);
        if (res.status === 200) {
            return true; // 유효한 키
        } else {
            return false; // 401 또는 기타 에러
        }
    } catch (error) {
        return false; // 네트워크 오류도 실패로 처리
    }
}
