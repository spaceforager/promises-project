$(function () {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // 1. 
    axios.get(`${baseURL}/new/draw/`)
        .then(res => {
            let { suit, value } = res.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });

    // 2. 
    let firstCard = null;
    axios.get(`${baseURL}/new/draw/`)
        .then(res => {
            firstCard = res.cards[0];
            let deckID = res.deck_id;
            return axios.get(`${baseURL}/${deckID}/draw/`);
        })
        .then(res => {
            let secondCard = res.cards[0];
            cardsArr = [firstCard, secondCard];
            cardsArr.forEach(card => {
                console.log(
                    `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
                );
            });
        });

    // 3. 
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    axios.get(`${baseURL}/new/shuffle/`).then(res => {
        deckId = res.deck_id;
        $btn.show();
    });

    $btn.on('click', function () {
        axios.get(`${baseURL}/${deckId}/draw/`).then(res => {
            let cardSrc = res.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (res.remaining === 0) $btn.remove();
        });
    });


});