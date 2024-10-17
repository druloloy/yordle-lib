import yordle from '../src/index'

describe('Core Test', () => {
    test('Empty string should throw an error', () => {
        const y = yordle({
            word: "greed",
            wordSize: 5
        });


        expect(()=>y.guess('')).toThrow(TypeError)
    })
    
    test('More or Less than 5 letter string should throw an error', () => {
        const y = yordle({
            word: "greed",
            wordSize: 5
        }) 
        expect(()=>y.guess('code')).toThrow(TypeError)
        expect(()=>y.guess('father')).toThrow(TypeError)
    })

    test('Correct or wrong guesses should return a ResultType object', () => {
        const word = 'greed'
        const y = yordle({
            word,
            wordSize: 5
        });
        
        for (let i = 0; i < 6; i++) {
            const answer = y.guess(y.draw());
            
            expect(answer).toBeInstanceOf(Array);
            answer.forEach((item: object) => {
                expect(typeof item).toBe('object');
            });

            if (i === 5){
                const real_answer = y.guess(word);
                const result = real_answer.every(letterResult => 
                    Object.values(letterResult)[0] === 'exact'
                )
                expect(result).toBe(true);
            }
        }
    })
})
