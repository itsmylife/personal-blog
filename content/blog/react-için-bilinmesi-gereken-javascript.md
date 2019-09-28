---
path: React için bilinmesi gereken JavaScript
date: 2019-09-12T19:38:11.753Z
title: React için bilinmesi gereken JavaScript
description: >-
  React’i öğrenirken ve kullanırken hangi JavaScript özelliklerini biliyor
  olmalısınız?
---

Makalenin İngilizce aslı: [JavaScript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)

Kullandığım diğer framework’lere (geliştirme kütüphaneleri) nazaran React’de sevdiğim şey JavaScript ile ne kadar çok uğraştığınız. Bir şablon dili yok (JSX anlaşılır JavaScript koduna çevriliyor). Bileşen/komponent (component) API(Application Programming Interface = Uygulama Geliştirme Arayüzü) [Reack Hooks](https://reactjs.org/hooks) ıle daha da basitleşti. Ve framework, temel UI (Kullanıcı arayüzü) işleri dışında size çok az soyutlaştırma sunuyor. (Yani ortaya çıkması beklenen iş için yazılımcıya dert olabilecek pek çok detay framework tarafından hallediliyor)

Bunun yüzden, React ile uygulama geliştirmek için JavaScrıpt özelliklerini/yeniliklerini öğrenmek oldukça muhim. Şimdi size öğrenmek için üzerinde biraz zaman harcamanızı tabsiye edeceğim bir kaç özellikten bahsedeceğimç Bu sayede React ile çalışırken mümkün olduğunca verimli olabilirsiniz.

----------

# **Template Literals**

Template Literal’ı özel güçleri olan string olarak düşünebiliriz.

```jsx
const greeting = 'Hello'
const subject = 'World'
console.log(`${greeting} ${subject}!`) // Hello World!

// Yukarıdakinin aynısı:
console.log(greeting + ' ' + subject + '!')

// React ile:
function Box({className, ...props}) {
  return <div className={`box ${className}`} {...props} />
}
```

[MDN: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

----------

# Shorthand property names

Bu çok yaygın ve kullanışlı ki bu olmadan n’apardım bilmiyorum.
```jsx
const a = 'hello'
const b = 42
const c = {d: [true, false]}
console.log({a, b, c})

// Yukarıdakinin aynısı:
console.log({a: a, b: b, c: c})

// React ile:
function Counter({initialCount, step}) {
  const [count, setCount] = useCounter({initialCount, step})
  return <button onClick={setCount}>{count}</button>
}
```
[MDN: Object initializer _New notations in ECMAScript 2015_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)

----------

# Arrow functions

_Arrow functions_ fonksiyon tanımlamanın bir başka yolu. Fakat bazı anlamsal farklılıkları var. Ne mutlu bize ki, eğer **_(sınıfların(class) yerine) hooks_** kullanıyorsak, bunlar için endişelenmemize gerek yok. Fakat _arrow functions_ bizim zahmetsizce verı döndürmemize izin verir bu yüzden sıkça kullanmak isteriz.

> Yukarıdaki örnekte bir şeye, parantezlere, dikkat etmemiz gerekiyor. Bu _arrow functions_’ın, JSX ile çalışırken bize sağladıgı güzel yeteneklerinden birisi.
```jsx
const getFive = () => 5
const addFive = a => a + 5
const divide = (a, b) => a / b

// Yukarıdakinin aynısı:
function getFive() {
  return 5
}

function addFive(a) {
  return a + 5
}

function divide(a, b) {
  return a / b
}

// React ile:
function TeddyBearList({teddyBears}) {
  return (
    <ul>
      {teddyBears.map(teddyBear => (
        <li key={teddyBear.id}>
          <span>{teddyBear.name}</span>
        </li>
      ))}
    </ul>
  )
}
```
[MDN: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

----------

# Destructuring

Destructurıng benim muhtemelen en sevdiğim JavaScrıpt özelliklerinden birisi. Obje’leri ve dizileri her zaman parçalarına bölerim (ve eğer _useState_ kullanıyorsanız muhtemelen siz de [yapıyorsunuz](https://kentcdodds.com/blog/react-hooks-array-destructuring-fundamentals)).

```jsx
// const obj = {x: 3.6, y: 7.8}
// makeCalculation(obj)

function makeCalculation({x, y: d, z = 4}) {
  return Math.floor((x + d + z) / 3)
}

// Yukarıdakinin aynısı:
function makeCalculation(obj) {
  const {x, y: d, z = 4} = obj
  return Math.floor((x + d + z) / 3)
}

// which is the same as
function makeCalculation(obj) {
  const x = obj.x
  const d = obj.y
  const z = obj.z === undefined ? 4 : obj.z
  return Math.floor((x + d + z) / 3)
}

// React ile:
function UserGitHubImg({username = 'ghost', ...props}) {
  return <img src={`https://github.com/${username}.png`} {...props} />
}
```

[MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

> Kesinlikle yukarıdaki makaleyi okuyun. Kesin yeni bir şey öğrenirsiniz. Bitirdiğinizde aşağıdaki kodu tek satır _destructuring_ ile yeniden düzenlemeye çalışın.

```js
function nestedArrayAndObject() {
  // refactor this to a single line of destructuring...
  const info = {
    title: 'Once Upon a Time',
    protagonist: {
      name: 'Emma Swan',
      enemies: [
        {name: 'Regina Mills', title: 'Evil Queen'},
        {name: 'Cora Mills', title: 'Queen of Hearts'},
        {name: 'Peter Pan', title: `The boy who wouldn't grow up`},
        {name: 'Zelena', title: 'The Wicked Witch'},
      ],
    },
  }
  // const {} = info // <-- replace the next few `const` lines with this
  const title = info.title
  const protagonistName = info.protagonist.name
  const enemy = info.protagonist.enemies[3]
  const enemyTitle = enemy.title
  const enemyName = enemy.name
  return `${enemyName} (${enemyTitle}) is an enemy to ${protagonistName} in "${title}"`
}
```
----------

# Parameter defaults

Bu benim sürekli kullandığım başka bir özellik. Fonksiyonlarınızın varsayılan değerlerini bildirmenin oldukça güçlü bir yolu.

```jsx
// add(1)
// add(1, 2)
function add(a, b = 0) {
  return a + b
}

// is the same as
const add = (a, b = 0) => a + b

// is the same as
function add(a, b) {
  b = b === undefined ? 0 : b
  return a + b
}

// React ile:
function useLocalStorageState({
  key,
  initialValue,
  serialize = v => v,
  deserialize = v => v,
}) {
  const [state, setState] = React.useState(
    () => deserialize(window.localStorage.getItem(key)) || initialValue,
  )

  const serializedState = serialize(state)
  React.useEffect(() => {
    window.localStorage.setItem(key, serializedState)
  }, [key, serializedState])

  return [state, setState]
}
```

[MDN: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

# Rest/Spread

**“… “** söz dizimi koleksiyonlar üzerinde çalışıyormuş gibi düşünülebilir. Ben sürekli kullanıyorum ve size de nasıl ve nerede kullanılacağını öğrenmenizi şiddetle tavsiye ediyorum. Farklı durumlarda farklı anlamlar alabiliyor. Farklılıkları öğrenmeniz yararınıza.

```jsx
const arr = [5, 6, 8, 4, 9]
Math.max(...arr)
// is the same as
Math.max.apply(null, arr)

const obj1 = {
  a: 'a from obj1',
  b: 'b from obj1',
  c: 'c from obj1',
  d: {
    e: 'e from obj1',
    f: 'f from obj1',
  },
}
const obj2 = {
  b: 'b from obj2',
  c: 'c from obj2',
  d: {
    g: 'g from obj2',
    h: 'g from obj2',
  },
}
console.log({...obj1, ...obj2})
// is the same as
console.log(Object.assign({}, obj1, obj2))

function add(first, ...rest) {
  return rest.reduce((sum, next) => sum + next, first)
}
// is the same as
function add() {
  const first = arguments[0]
  const rest = Array.from(arguments).slice(1)
  return rest.reduce((sum, next) => sum + next, first)
}

// React ile:
function Box({className, ...restOfTheProps}) {
  const defaultProps = {
    className: `box ${className}`,
    children: 'Empty box',
  }
  return <div {...defaultProps} {...restOfTheProps} />
}
```

[MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

[MDN: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

----------

# ESModules

Modern araçlarla uygulama geliştiriyorsanız, modülleri desteklediğini varsayıyorum, söz diziminin nasıl çalıştığını bilmek iyi bir fikirdirç. Çünkü çoğu uygulama, önemsiz boyutlardakiler bile, kodun yeniden kullanımı ve organizasyonu için modülleri kullanmalıdır.

```jsx
export default function add(a, b) {
  return a + b
}

/*
 * import add from './add'
 * console.assert(add(3, 2) === 5)
 */

export const foo = 'bar'

/*
 * import {foo} from './foo'
 * console.assert(foo === 'bar')
 */

export function subtract(a, b) {
  return a - b
}

export const now = new Date()

/*
 * import {subtract, now} from './stuff'
 * console.assert(subtract(4, 2) === 2)
 * console.assert(now instanceof Date)
 */

// React ile:
import React, {Suspense, Fragment} from 'react'
```

[MDN: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

[MDN: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

Bir başka kaynak olarak bu konudaki bir konuşmamı [buradan](https://www.youtube.com/watch?v=kTlcu16rSLc&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) izleyebilirsiniz.

----------

# Ternaries

Bunları seviyorum. Oldukça açıklayıcılar, özellikle JSX içinde.

> [Prettier](https://prettier.io/)’den önce kodunu temizlemek için ternarry kullanmak zorunda kalan insanlarınö ternarry’den tiksindiklerini farkettim. Hala prettier kullanmıyorsanız eğer size kullanmanızı şiddetle tavsiye ederim. Ternarry’leri daha anlaşılır hale getiriyor.

```jsx
const message = bottle.fullOfSoda
  ? 'The bottle has soda!'
  : 'The bottle may not have soda :-('

// is the same as
let message
if (bottle.fullOfSoda) {
  message = 'The bottle has soda!'
} else {
  message = 'The bottle may not have soda :-('
}

// React ile:
function TeddyBearList({teddyBears}) {
  return (
    <React.Fragment>
      {teddyBears.length ? (
        <ul>
          {teddyBears.map(teddyBear => (
            <li key={teddyBear.id}>
              <span>{teddyBear.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>There are no teddy bears. The sadness.</div>
      )}
    </React.Fragment>
  )
}
```

[MDN: Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

----------

# Array Methods

Diziler muhteşemler ve ben dizi metotlarını sürekli kullanıyorum. Muhtemelen en çok kullandıklarım şunlar:

-   find
-   some
-   every
-   includes
-   map
-   filter
-   reduce

Bir kaç örneğe gözatalım:

```jsx
onst dogs = [
  {
    id: 'dog-1',
    name: 'Poodle',
    temperament: [
      'Intelligent',
      'Active',
      'Alert',
      'Faithful',
      'Trainable',
      'Instinctual',
    ],
  },
  {
    id: 'dog-2',
    name: 'Bernese Mountain Dog',
    temperament: ['Affectionate', 'Intelligent', 'Loyal', 'Faithful'],
  },
  {
    id: 'dog-3',
    name: 'Labrador Retriever',
    temperament: [
      'Intelligent',
      'Even Tempered',
      'Kind',
      'Agile',
      'Outgoing',
      'Trusting',
      'Gentle',
    ],
  },
]

dogs.find(dog => dog.name === 'Bernese Mountain Dog')
// {id: 'dog-2', name: 'Bernese Mountain Dog', ...etc}

dogs.some(dog => dog.temperament.includes('Aggressive'))
// false

dogs.some(dog => dog.temperament.includes('Trusting'))
// true

dogs.every(dog => dog.temperament.includes('Trusting'))
// false

dogs.every(dog => dog.temperament.includes('Intelligent'))
// true

dogs.map(dog => dog.name)
// ['Poodle', 'Bernese Mountain Dog', 'Labrador Retriever']

dogs.filter(dog => dog.temperament.includes('Faithful'))
// [{id: 'dog-1', ..etc}, {id: 'dog-2', ...etc}]

dogs.reduce((allTemperaments, dog) => {
  return [...allTemperaments, ...dog.temperaments]
}, [])
// [ 'Intelligent', 'Active', 'Alert', ...etc ]

// React ile:
function RepositoryList({repositories, owner}) {
  return (
    <ul>
      {repositories
        .filter(repo => repo.owner === owner)
        .map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
    </ul>
  )
}
```

[MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

----------

# Promises and async/await

Bu büyük bir konu. Bu konuda iyi hale gelmek için üzerinde biraz çalışmak gerekiyor. JavaScript ve React içinde _Promise’_ler her yerdeler. _Promise_ asenkron çalışan (DOM’dan ya da üçüncü parti bir yazılımdan gelen) kodu yönetmenize yardım eder. Async/await ise Promise’lerle daha kolay başetmemizi saülayan özel bir söz dizimi.

```jsx
function promises() {
  const successfulPromise = timeout(100).then(result => `success: ${result}`)

  const failingPromise = timeout(200, true).then(null, error =>
    Promise.reject(`failure: ${error}`),
  )

  const recoveredPromise = timeout(300, true).then(null, error =>
    Promise.resolve(`failed and recovered: ${error}`),
  )

  successfulPromise.then(log, logError)
  failingPromise.then(log, logError)
  recoveredPromise.then(log, logError)
}

function asyncAwaits() {
  async function successfulAsyncAwait() {
    const result = await timeout(100)
    return `success: ${result}`
  }

  async function failedAsyncAwait() {
    const result = await timeout(200, true)
    return `failed: ${result}`
  }

  async function recoveredAsyncAwait() {
    let result
    try {
      result = await timeout(300, true)
      return `failed: ${result}` // this would not be executed
    } catch (error) {
      return `failed and recovered: ${error}`
    }
  }

  successfulAsyncAwait().then(log, logError)
  failedAsyncAwait().then(log, logError)
  recoveredAsyncAwait().then(log, logError)
}

function log(...args) {
  console.log(...args)
}

function logError(...args) {
  console.error(...args)
}

// This is the mothership of all things asynchronous
function timeout(duration = 0, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(`rejected after ${duration}ms`)
      } else {
        resolve(`resolved after ${duration}ms`)
      }
    }, duration)
  })
}

// React ile:
function GetGreetingForSubject({subject}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [greeting, setGreeting] = React.useState(null)

  React.useEffect(() => {
    async function fetchGreeting() {
      try {
        const response = await window.fetch('https://example.com/api/greeting')
        const data = await response.json()
        setGreeting(data.greeting)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    setIsLoading(true)
    fetchGreeting()
  }, [])

  return isLoading ? (
    'loading...'
  ) : error ? (
    'ERROR!'
  ) : greeting ? (
    <div>
      {greeting} {subject}
    </div>
  ) : null
}
```

[MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

[MDN: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

----------

# Sonuç

Elbette, React uygulamaları geliştirirken yardımcı olan daha pek çok özellik mevcut. Fakat bunlar benim favorilerim. Umarım siz bunları faydalı bulursunuz.

Eğer bu konularda daha derine inmeyi düşünürseniz, size yararlı olabileceğini düşündüğüm, [PayPal’da çalışırken gerçekleştirdiğim ve kaydettiğim bir JavaScript Çalışma](https://www.youtube.com/playlist?list=PLV5CVI1eNcJgUA2ziIML3-7sMbS7utie5) Atölyesi var.

Başarılar.
