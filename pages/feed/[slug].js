export const Feed = () => {


}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.slug
    
    const response = await fetch(
        `https://api.jikan.moe/v4/characters?page=${pageNumber}&q=${animeQuery}`
    )

    const results = await response.json()
    console.log(results)
}


export default Feed