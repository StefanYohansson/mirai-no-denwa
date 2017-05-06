# Web::Telephone

(p)react+redux softphone using jssip or verto adapter.

---


# Quick-Start Guide

- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Structure](#structure)


## Installation

**1. Clone this repo:**

```sh
git clone https://github.com/StefanYohansson/web-telephone.git
cd web-telephone
```

**3. Install the dependencies:**

```sh
npm install
```

> You're done installing! Now let's get started developing.



## Development Workflow


**4. Start a live-reload development server:**

```sh
PORT=8080 npm run dev
```

> This is a full web server nicely suited to your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**5. Generate a production build in `./build`:**

```sh
npm run build
```

You can now deploy the contents of the `build` directory to production!

> **Example:** deploy to [surge.sh](https://surge.sh):
>
> `npm i surge && surge build -d my-app.surge.sh`


---


## Structure

Apps are built up from simple units of functionality called Components. A Component is responsible for rendering a small part of an application, given some input data called `props`, generally passed in as attributes in JSX. A component can be as simple as:

```js
class Link extends Component {
  render({ to, children }) {
    return <a href={ to }>{ children }</a>;
  }
}
// usage:
<Link to="/">Home</Link>
```


---


## License

MIT


[Preact]: https://github.com/developit/preact
[webpack]: https://webpack.github.io
