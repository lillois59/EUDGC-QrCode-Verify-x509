# EUDGC Signer SIGN_KEY_ID from Public Key

PoC to create an european valid vaccination "certificate" QR codes with european standards open sources codes and librairy

> 🛑 **DISCLAIMER PLEASE READ** 🛑
>
> **recreate a valid EU Covid Vaccination QRcode it's forbiden. It's for purposes educational & researchers Only**.
> **this script are developed with spirit to find vulnerability for advice the dev-team**.
>
>
> **2021 last exercice**
> The QRcode is signed with a private key to certify its authenticity, so except if you found a way to get it (which is nearly impossible). Your QRcode will be Generated and Decoded with your personal details **BUT marked as invalid** in some applications (web android ios).
This project allows you to make deep exercice with QRcode, CBOR, COSE, Zlib and more stuff. Please not to do forgery, or counterfeiting.
>
> If you have any question about how it works, please first take time to read more about the structure.
> https://linkedin.com/in/lillois

## How it works

```
1) Read png, jpeg, pdf files
2) Find & decode QRcode
3) Remove HC1 (health certificate) prefix
4) Base45 decode
5) zlib inflate (decompress)
6) CBOR decode required fields
```

Same thing for the QRcode creation... reverse order.

## Prerequisites

**Requires Node.js 12 at least**, otherwise you'll get the `ReferenceError: TextDecoder is not defined` error.

```bash
nvm use 12
```

## Install

```bash
git clone https://github.com/camillegroult/EUDGC-QrCode-Verify-x509.git
cd EUDGC-QrCode-Verify-x509
npm i
```

## Usage

```bash
npm start <your_certif_qr_image>

# Return
Opening eu_digital_att.png ...
Decoded in 499 ms: {
  v: [
    {
      ci: 'urn:uvci:01:FR:AZERTY123456#7',
      co: 'FR',
      dn: 2,
      dt: '2022-01-10',
      is: 'CNAM',
      ma: 'ORG-PFIZER',
      mp: 'EU/BIONTECH',
      sd: 2,
      tg: '1234567',
      vp: 'XXAA000'
    }
  ],
  dob: '1993-12-12',
  nam: { fn: 'GROULT', gn: 'CAMILLE', fnt: 'GROULT', gnt: 'CAMILLE' },
  ver: '1.3.0'
}
```

## Helpful sources
- https://github.com/eu-digital-green-certificates
- https://blog.hqcodeshop.fi/archives/516-Decoding-EU-Digital-COVID-Certificate.html
- https://www.iana.org/assignments/cose/cose.xhtml
- https://gitlab.inria.fr/tousanticovid-verif/tousanticovid-verif-ios/-/blob/master/Anticovid%20Verify/resources/prod/prod.plist
- https://ehealth.vyncke.org/
- https://github.com/ehn-dcc-development/hcert-spec/blob/main/hcert_spec.md
- https://ec.europa.eu/health/sites/default/files/ehealth/docs/covid-certificate_json_specification_en.pdf

## Used libraries

- `jsQR`
- `jimp`
- `base45`
- `cbor`
- `zlib`
