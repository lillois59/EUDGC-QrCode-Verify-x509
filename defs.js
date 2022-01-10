// Create a EUDGC Qr Code
// https://ec.europa.eu/health/sites/default/files/ehealth/docs/digital-green-certificates_dt-specifications_en.pdf
// Ref : https://blog.hqcodeshop.fi/archives/516-Decoding-EU-Digital-COVID-Certificate.html
// Developer : camillegroult.fr
// https://github.com/ehn-dcc-development/hcert-spec/blob/main/hcert_spec.md
// 1    -> country of establishment?
// 4    -> last vaccination date
// 6    -> QR code generation date
// -260 -> version, name, birth date, certif signature

module.exports = {
    CLAIM_KEY_CERT: -260,
    CLAIM_KEY_V1EU: 1,
    CLAIM_ISSUER: 1,
    CLAIM_LAST_VAX_DATE: 4,
    CLAIM_QR_GEN_DATE: 6,
    CLAIM_HEADER_SIGN_ALGO: 1,
    CLAIM_HEADER_KEY_IDENTIFIER: 4,
    HEALTH_CERTIFICATE_PREFIX: 'HC1:',
    CBOR_TAG_VERSION: 18
};
