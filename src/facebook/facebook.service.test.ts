import { pipelineService } from './facebook.service';
import { AGE_GENDER_INSIGHTS } from './pipeline.const';

const cases = [AGE_GENDER_INSIGHTS];

describe('Facebook Service', () => {
    it.each(cases)('Pipeline Service $name', async (pipeline) => {
        const options = {
            accountId: '366740567397582',
            start: '2022-01-01',
            end: '2022-12-01',
        };

        return pipelineService(options, pipeline).then((res) => expect(res).toBeTruthy());
    });
});
