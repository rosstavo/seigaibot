module.exports = {
    discordFormatEmbed: (content, embed) => {

        const TurndownService = require('turndown');
        const truncate = require('truncate-html');

        // Convert content to Markdown
        var turndownService = new TurndownService();

        var truncatedHTML = truncate(content, 1024, {
            ellipsis: '... [Content clipped]'
        });

        var markdown = turndownService.turndown(truncatedHTML);

        return embed.setDescription(markdown);

    },
    formatEmbed: (embed) => {

        embed.setAuthor('Tomodachi-san says:', 'https://seigai.world/imgs/tomodachi.png')
            .setColor(0x17bc9b);

        return embed;
    },
    rollDice: (size, number, mod = 0) => {
        
        let total = 0;

        for (let i = 0; i < number; i++) {
            total = total + Math.ceil(Math.random() * size) + mod;
        }

        return total;
    },
    arrayRandom: (arr, qty, unique = false) => {

        let i = 0;
        let results = [];

        do {
            let result = arr[Math.floor(Math.random() * arr.length)];

            if (unique && results.indexOf(result) !== -1) {
                continue;
            }

            results.push(result);

            i++;

        } while (i < qty);

        return results;
    },
    arrayWeightedRandom: (arr) => {

        let weightedArr = [];

        for (let key in arr) {

            for (let i = 0; i < arr[key].weight; i++) {
                weightedArr.push(key);
            }

        }

        return arr[weightedArr[Math.floor(Math.random() * weightedArr.length)]];

    },
    romajiToPronunciationGuide: (str) => {

        const converter = require('@koozaki/romaji-conv');
        const {
            romajiToKana
        } = require('simple-romaji-kana');

        const pronunciations = require('./pronunciations.json');

        str = str.toString();

        let pronunciationGuide = romajiToKana(str.toUpperCase());

        for (let katakana in pronunciations) {
            
            if (pronunciationGuide.indexOf(katakana) !== -1) {
                pronunciationGuide = pronunciationGuide.replace(katakana, pronunciations[katakana] + '-');
            }

        }

        return pronunciationGuide.substring(0, pronunciationGuide.length - 1);
    }
};
