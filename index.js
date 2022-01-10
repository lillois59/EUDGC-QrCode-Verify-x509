// Create a EUDGC Qr Code
// https://ec.europa.eu/health/sites/default/files/ehealth/docs/digital-green-certificates_dt-specifications_en.pdf
// Ref : https://blog.hqcodeshop.fi/archives/516-Decoding-EU-Digital-COVID-Certificate.html
// Developer : camillegroult.fr


const { pass2qr } = require("./lib/generator");
const { qr2pass } = require("./lib/extractor");



const IMG_PATH = process.argv[2];
if (!IMG_PATH) {
    console.error('Usage: npm start <path_to_image>');
    return process.exit(-1);
}

(async () => {

    // Create a QR code (check function code)
    await createOne();

    // Try to parse an existing one
    const ts = new Date();
    console.log('Opening', IMG_PATH, '...');
    const extrInfo = await qr2pass(IMG_PATH);
    console.log('Decoded in', (new Date() - ts), 'ms:', extrInfo);

})();



async function createOne() {


    // CBOR structure ES256	-7	ECDSA w/ SHA-256 [RFC-ietf-cose-rfc8152bis-algs-12]
    const AGLO_SIGN = -7 // Protected Header Signature Algorithm (may-be public);
    const SIGN_KEY_ID = Buffer.from(['0oCvyNKB210=', /* Here sample of EU getway... 8 bytes sequence for the used algorithm signature (may-be public) */]);
    const HCERT_SIGN = Buffer.from(['',/* ... 64 bytes sequence health certificate signature */]);


    const obj = {
        v: [
          {
              // Unique certificate identifier
              ci: 'URN:UVCI:01:FR:SXRQTBSXRQTBM9CDJGM9CDJG#7',
              // Member State or third country in which the vaccine was administered
              co: 'FI',
              // Doses count
              dn: 3,
              // Date of vaccination
              dt: '2021-12-20',
              // Vaccine issuer
              is: 'The Social Insurance Institution of Finland',
              // Vaccine manufacturer, e.g., "ORG-100030215" (Biontech Manufacturing GmbH)
              ma: 'ORG-100030215',
              // Vaccine product, e.g., "EU/1/20/1528" (Comirnaty)
              mp: 'EU/1/20/1525',
              // Overall doses count
              sd: 3,
              // Targeted agent / disease
              tg: '840539006',
              // Type of vaccine used
              vp: 'J07BX03'
          }
          ],
          // Date of birth
    dob: '1969-01-06',
    // Firstnames an lastnames, according to ICAO 9303 transliteration
    nam: { fn: 'KIATURE', gn: 'RIJAH', fnt: 'KIATURE', gnt: 'RIJAH' },
    // JSON schema / certificate semantic version
    ver: '1.3.0'
};



    const strQR = await pass2qr(
        AGLO_SIGN, SIGN_KEY_ID, HCERT_SIGN,
        'SIIF', // Vaccine issuer, french one here
        1703703754 /* timestamp of vaccination */,
        1640602800 /* timestamp for qrcode generation date */,
        obj,
        './QR_CODE.png' // path to output
    );
    console.log('Generated!', strQR);

}
