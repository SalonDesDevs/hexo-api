# Simple hexo API

## Installation

Place the content of the `scripts` folder of this repo inside the `scripts` folder of your hexo installation (create it if necessary).

## API specifications

The api is specifically tailored to our website. Feel free to modify it as you like

### `GET /api/posts/list`

Returns a json object with `id`, `title`, `author`, `date`, `picture` and `url`

### `POST /api/post/content/by-id`

Data should be `application/json`, and should contain an `id` property

It returns an object with the same properties as the previous endpoint plus a `content` property,
which contains the html-formatted content.

### `POST /api/post/content/by-uri`

Same as above, but takes a json object with `id_suffix` as a substring of the end of an article id and `sanitized_title` which should match the
title given in an uri.

The function that sanitizes a title is the following: 

```javascript
const sanitize = title => title.match(/[a-z ]/gi).join('').replace(/ /g, '-').toLowerCase();
```

## License

Unlicense

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
```
