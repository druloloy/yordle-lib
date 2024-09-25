import { WordBank, Yordle } from '../src/index'

describe('Core Test', () => {
    test('Empty string should throw an error', () => {
        const word = WordBank.draw()
        const yordle = new Yordle(word);
        expect(()=>yordle.guess('')).toThrow(TypeError)
    })
    
    test('More or Less than 5 letter string should throw an error', () => {
        const word = WordBank.draw()
        const yordle = new Yordle(word);
        expect(()=>yordle.guess('code')).toThrow(TypeError)
        expect(()=>yordle.guess('father')).toThrow(TypeError)
    })

    test('Correct or wrong guesses should return a ResultType object', () => {
        const word = WordBank.draw()
        const yordle = new Yordle(word);
        
        for (let i = 0; i < 6; i++) {
            const answer = yordle.guess(WordBank.draw());
            
            expect(answer).toBeInstanceOf(Array);
            answer.forEach((item: object) => {
                expect(typeof item).toBe('object');
            });

            if (i === 5){
                const real_answer = yordle.guess(word);
                const result = real_answer.map(obj => { 
                    const letter = Object.keys(obj)[0];
                    return {
                        [letter]: 'exact'
                    }} 
                )
                expect(real_answer).toEqual(result)
            }
        }
    })
})
