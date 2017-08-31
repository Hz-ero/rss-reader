const cheerio = require('cheerio')

var htmlString = '<p>IT之家8月31日消息 除了传统的Win10超极本之外，宏碁在本次的IFA2017上面也推出了一款Chromebook笔记本：Chromebook15，拥有15.6英寸的屏幕以及12小时的续航时间，同样采用无风扇设计。</p><p><img src="http://img.ithome.com/newsuploadfiles/2017/8/20170831_110350_643.jpg" w="600" h="528"/></p><p>宏碁Chromebook15笔记本搭载的是Intel奔腾或赛扬处理器，屏幕大小为15.6英寸，采用无风扇设计，机身采用铝合金材料来对整台电脑进行散热。宏碁称全新的Chromebook 15支持从谷歌商店安装应用进行使用，同时续航时间能够达到12个小时。</p><p>Chromebook 15笔记本拥有2个USB 3.1接口以及USB 3.0接口和HDMI接口，4/8GB内存和32/64GB eMMC闪存，全新的Chromebook 15将于十月份正式发售，售价399美元（约合2632元人民币）起。</p>'

const findShortDescrip = (content, source) => {
    const $ = cheerio.load(content)
    let paraIndex = 0
    let regex = ''

    const findParaHasNoImg = (index) => {
        const getImgInPara = $('p').eq(index).find('img')
        if (getImgInPara.length > 0) {
            paraIndex = index + 1
            findParaHasNoImg(paraIndex)
        }
        const thisPara = $('p').eq(paraIndex).text()
        paraIndex = index + 1
        return thisPara
    }
    let shortDescrip = findParaHasNoImg(paraIndex)
    let secondPara = findParaHasNoImg(paraIndex)

    if (source === 'ithome') { regex = /^感谢IT之家网友.*$/ }
    if (source === '36kr') { regex = /^编者按:本文来自.*$/ }

    if (regex.test(shortDescrip)) {
        shortDescrip = secondPara
    }
    if (shortDescrip.length > 131) {
        shortDescrip = shortDescrip.slice(0, 130) + '...'
    }
    return shortDescrip
}

const ttt = findShortDescrip(htmlString, 'ithome')
const test = 'aaa'