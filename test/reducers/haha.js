var string = ' <guid isPermaLink="false">http://www.ifanr.com/?p=904617&amp;utm_source=rss&amp;utm_medium=rss&amp;utm_campaign=</guid>'
const ParseString = require('xml2js').parseString
ParseString(string, (err, result) => {
  if (result) {
    console.log(result)
  } else {
    console.log(err)
  }
})
