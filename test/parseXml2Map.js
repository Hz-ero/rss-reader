var parseString = require('xml2js').parseString;
const cheerio = require('cheerio')

var xml = '<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title>IT之家</title><language>zh-cn</language><pubDate>Tue, 29 Aug 2017 23:53:22 GMT</pubDate><generator>ITHome.com</generator><description>IT之家 - 软媒旗下网站</description><link>http://www.ithome.com/</link><item><title>Google新技术ARCore，要让一亿人抓起手机玩增强现实</title><link>https://www.ithome.com/html/it/323641.htm</link><guid>https://www.ithome.com/html/it/323641.htm</guid><description><![CDATA[<p>苹果的ARKit为什么神奇？</p><p><span style="color: rgb(127, 127, 127);">Expeditions的生物学课程：染色体</span></p><p>然而，推广增强现实版Expeditions当时的难点在硬件上，简单来说就是没有那么多模组手机可以买到，模组较贵不利于推广——ARCore的问世显著降低了硬件门槛。</p><p>但目前，ARCore仅支持Google和三星的高端机型：Pixel、Pixel XL和S8、S8+。不过Google说正在和华为、三星、LG、华硕等主流厂商合作。Google的目标是到今年冬天推出ARCore 1.0，让1亿人抓起Android手机就能玩增强现实。</p>]]></description><pubDate>Tue, 29 Aug 2017 23:48:37 GMT</pubDate></item><item><title>工信部约谈星美、天音、分享三家虚拟运营商，涉电信诈骗</title><link>https://www.ithome.com/html/it/323640.htm</link><guid>https://www.ithome.com/html/it/323640.htm</guid><description><![CDATA[<p>根据CCTV报道，近期工信部对深圳星美圣典、天音通信、分享通信三家移动转售企业进行约谈，就深圳星美圣典、分享通信在移动转售业务代理渠道、责任落实等方面的突出问题进行通报，要求相关移动转售企业严格按照《工]]><![CDATA[业和信息化部关于进一步防范和打击通讯信息诈骗工作的实施意见》（工信部网安函〔2016〕452号）及有关要求，切实落实主体责任。</p><p>这三家企业要解决三大问题：</p><p>1、要及时发现企业手机号码在准入、代理等方面存在的漏洞和薄弱环节，立行立改；</p><p>2、要加强对重点地区的疑似诈骗号码大数据分析工作，建立相关号码预警模型，全量排查高度疑似号码；</p><p>3、要加大对违规问题的追责惩戒力度，对发现的企业内部或代理渠道违规行为，要严肃处理，实现诈骗电话用户举报量和公安通报涉案号码数量尽快明显下降的目标。</p>]]></description><pubDate>Tue, 29 Aug 2017 23:39:55 GMT</pubDate></item></channel></rss>'



const handleIthome = (rssObj) => {
    
    // 获取文章数组
    const rssItems = rssObj.rss.channel[0].item

    // ithome rss 项目解析
    const resolve2html = (rssItem) => {
        const $ = cheerio.load(rssItem.description[0])

        // guid
        let guid = rssItem.guid[0].slice(-10, -4)
        guid = 'ithome_'+guid

        // title
        const title = rssItem.title[0]

        // link
        const link = rssItem.link[0]

        // showImg
        let showImg = $('img').first().attr('src')
        if (!showImg) {
            showImg = './assets/img/ithome.png'
        }

        // shortDescrip
        let shortDescrip = $('p').first().text()
        let secondPara = $('p').eq(1).text()
        let findImgInSecPara = $('p').eq(1).find('img')
        if (findImgInSecPara.length>0) {
            secondPara = $('p').eq(2).text()
        }
        let findErrInFirPara = shortDescrip.match("感谢IT之家网友")
        if (findErrInFirPara) {
            shortDescrip = secondPara
        }

        // description
        $('img').wrap("<strong></strong>")
        const description = $.html()

        // pubDate
        const pubDate = rssItem.pubDate[0]

        // all data
        const itemObj ={
            guid,
            title,
            link,
            showImg,
            shortDescrip,
            description,
            pubDate,

            source: 'ithome',
            readed: false
        }
        return [guid, itemObj]
    }

    const articlesArray = rssItems.map(resolve2html)
    return articlesArray
}


parseString(xml, function (err, result) {
    var test = handleIthome(result)
    console.log(test);
});

