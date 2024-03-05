


const getRandomJoke = async () => {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        return data;
    } catch (error) {
        throw error
    }
}


module.exports = {
    getRandomJoke
}