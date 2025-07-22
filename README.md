# vernam
The package provides methods for working with the Vernam cipher.

## Usage
```js
import Vernam from 'vernam';

// Static methods
Vernam.encrypt('your text', 'your key', encoding);  // AAAAAAAfAAEN
Vernam.decrypt('your text', 'your key', encoding);  // eW91ciB0ZXh0

// encoding must be 'hex' | 'base64' | 'buff'
```
Make sure to use a consistent encoding for proper encryption/decryption of a given text.  
Avoid doing something like this:
```js
const encrypted = Vernam.encrypt('your text', 'your key', 'base64');
const decrypted = Vernam.decrypt(encrypted, 'your key', 'hex');
```

Output always will be in ```hex```, ```base64``` or ```Buffer```.  
To make conversion to ```utf-8``` possible, use toUtf8:
```js
Vernam.toUtf8(decrypted, 'base64');  // your text
```

You can also create a 'session' for using the cipher within the same key and encoding.
```js
const vernam = Vernam.session('secret key', 'hex');

const encrypted = vernam.encrypt('Hello Wolrd');  // 3b000f1e0a547704171517
const decrypted = vernam.decrypt(encrypted);  // 48656c6c6f20576f726c64
const inUtf8 = vernam.toUtf8(decrypted);  // Hello World
```

The class includes a static method for generating a random string in the format ```xxx-xxx-xxx-...```  
```js
const key = Vernam.generate(7);
console.log(key);  // kR6-yS9-sO3-gK2-sW0-jZ6-lX7

// 7 random triples
```

## API
static  
```Vernam.encrypt(input: string, key: string, encoding: 'hex' | 'base64' | 'buff')```  
```Vernam.decrypt(input: string | Buffer, key: string, encoding: 'hex' | 'base64' | 'buff')```  
```Vernam.toUtf8(input: string | Buffer, encoding: 'hex' | 'base64' | 'buff')```  
```Vernam.generate(triples)```  
```Vernam.session(key: string, encoding: 'hex' | 'base64' | 'buff')```  
instance  
```vernam.encrypt(input: string)```  
```vernam.decrypt(input: string | Buffer)```  
```vernam.toUtf8(input: string | Buffer)```  

## LICENSE
MIT
