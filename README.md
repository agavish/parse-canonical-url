# parse-canonical-url
Parse canonical url of cross device supported web sites.

#  [![Build Status](https://secure.travis-ci.org/agavish/parse-canonical-url.png?branch=master)](http://travis-ci.org/agavish/parse-canonical-url)



## What?
<br>
Many web applications redirect to a different url when browsing them from desktop or mobile devices.

This module makes it easy to parse the canonical and alternate url that almost every supported web application provides.

This module simply grabs the canonical/alternate href attribute from the html response of the given url.

Examples:<br>
 `<link rel="canonical" href="https://www.linkedin.com/?trk=">`<br>
 `<link rel="alternate" hreflang="en-il" href="https://il.linkedin.com/">`

## How to use it
<br>

`npm install parse-canonical-url`

This module return a promise and this is how to use it:

```
var parseCanonicalUrl = require('parse-canonical-url');

return parseCanonicalUrl.canonical(askedUrl)
            .then(function(result) {
                console.log(result);
            })
            .catch(function(err) {
				console.log(err);
            });

OR

return parseCanonicalUrl.alternate(askedUrl)
            .then(function(result) {
                console.log(result);
            })
            .catch(function(err) {
				console.log(err);
            });
            
```


## License

Copyright (c) 2015 Adam Gavish  
Licensed under the MIT license.