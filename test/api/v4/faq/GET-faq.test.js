import {
  requester,
  translate,
} from '../../../helpers/api-integration/v4';
import i18n from '../../../../website/common/script/i18n';

describe('GET /faq', () => {
  describe('language parameter', () => {
    it('returns faq (and does not require authentication)', async () => {
      const res = await requester().get('/faq');

      expect(res).to.have.property('stillNeedHelp');
      expect(res.stillNeedHelp.ios).to.equal(translate('iosFaqStillNeedHelp'));
      expect(res).to.have.property('questions');
      expect(res.questions[25].question).to.equal(translate('faqQuestion25'));
    });

    it('returns faq not in English', async () => {
      const res = await requester().get('/faq?language=de');
      expect(res).to.have.nested.property('stillNeedHelp.ios');
      expect(res.stillNeedHelp.ios).to.equal(i18n.t('iosFaqStillNeedHelp', 'de'));
    });

    it('falls back to English if the desired language is not found', async () => {
      const res = await requester().get('/faq?language=wrong');
      expect(res).to.have.nested.property('stillNeedHelp.ios');
      expect(res.stillNeedHelp.ios).to.equal(translate('iosFaqStillNeedHelp'));
    });
  });

  describe('platform parameter', () => {
    it('returns an error when invalid platform parameter is specified', async () => {
      const request = requester().get('/faq?platform=wrong');
      await expect(request)
        .to.eventually.be.rejected.and.eql({
          code: 400,
          error: 'BadRequest',
          message: i18n.t('invalidReqParams'),
        });
    });
  });
});
