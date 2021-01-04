module.exports = {
    name: '!npc',
    description: 'Use this command to notify the channel if you want to do a group check-in.',
    execute(msg, args, embed) {

        const races = require('../races.json');
        const zodiac = require('../zodiac.json');
        const names = require('../names.json');
        const fns = require('../functions.js');

        let age = 0;
        let offset = 2;
        let futureBirthday = Math.round(Math.random());
        let gender = fns.arrayRandom(['Male', 'Male', 'Male', 'Female', 'Female', 'Female', 'Non-Binary']);
        let name = fns.arrayRandom(names[gender]);

        let race = fns.arrayWeightedRandom(races);

        do {
            age = fns.rollDice(64, 3);

            console.log(age);
        }
        while (age < 92);

        let racialAge = Math.round(((race.maxAge - race.minAge) * (age - 92) / 100)) + race.minAge;

        // ((116 - 16) * (age - 50) / 100 = 100 * 25 / 100 = 25) + 16 = 41
        // 

        let theZodiac = Object.keys(zodiac)[11 - ((racialAge - futureBirthday - offset) % 12)];

        let alignmentCoef = (Math.round(Math.random() * 2)) - 1;

        let alignment = (alignmentCoef) => {
            if (alignmentCoef === 1) {
                return 'Virtuous';
            }
            if (alignmentCoef === -1) {
                return 'Flawed';
            }
            return 'Neutral';
        };

        let virtues = fns.arrayRandom(zodiac[theZodiac].virtues, 3 + alignmentCoef, true);

        let flaws = fns.arrayRandom(zodiac[theZodiac].flaws, 3 - alignmentCoef, true);


        embed.setTitle('I managed to create this person:')
            .addField('Name', name, true)
            .addField('Pronunciation*', fns.romajiToPronunciationGuide(name), true)
            .addField('Race', race.name, true)
            .addField('Gender', gender, true)
            .addField('Age', `${racialAge} years`, true)
            .addField('Sign', theZodiac.charAt(0).toUpperCase() + theZodiac.slice(1) + ` (${alignment(alignmentCoef)})`, true)
            .addField('Virtues', virtues.join(', '), false)
            .addField('Flaws', flaws.join(', '), false)
            .setFooter('*Approximation');

        msg.channel.send(embed);

    },
};
