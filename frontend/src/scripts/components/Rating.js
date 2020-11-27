export default class Rating{
    static render({numOfStars, textStar}){
        if(!numOfStars){
            return '<div></div>'
        }

        return `
            <section class="rating">
                <span class="material-icons gold">
                    ${numOfStars >= 1 ? 'star' : numOfStars >= 0.5 ? 'star_half' : 'star_outline'}
                </span>

                <span class="material-icons gold">
                    ${numOfStars >= 2 ? 'star' : numOfStars >= 1.5 ? 'star_half' : 'star_outline'}
                </span>

                <span class="material-icons gold">
                    ${numOfStars >= 3 ? 'star' : numOfStars >= 2.5 ? 'star_half' : 'star_outline'}
                </span>

                <span class="material-icons gold">
                    ${numOfStars >= 4 ? 'star' : numOfStars >= 3.5 ? 'star_half' : 'star_outline'}
                </span>

                <span class="material-icons gold">
                    ${numOfStars >= 5 ? 'star' : numOfStars >= 4.5 ? 'star_half' : 'star_outline'}
                </span>

                <span class="reviewText">
                    ${textStar || ''}
                </span>
            </section>
        `
    }
}