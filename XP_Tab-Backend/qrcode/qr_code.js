const QRCode = require('qrcode')

const siteURL = 'http://127.0.0.1:5501/index.html?mesa=2'

QRCode.toDataURL(siteURL, (err, url) => {
  if (err) {
    console.error('Erro ao gerar o QR Code:', err)
  } else {
    console.log('QR Code gerado com sucesso!')
    console.log(url)
  }
})
