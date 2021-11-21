# Mathematically Beautiful Language

This is a preview into the possibility of using the _C_ programming language and tools such as _flex_ and _bison_ to create _mbl_ (a Mathematically Beautiful Language).

Now, there are so many programming languages and there is an academic way that mathematicians express themselves in writing formulas (which is a function) by using symbols that are not readily available on the QWERTY keyboard. The idea here is to construct a language that makes use of unicode and/or a tool such as [MathJax](https://www.mathjax.org/) to write the mathematical expressions but also to evaluate those expressions. Imagine a programming language that can evaluate πr² (where π is built-in value and r is a variable). Or what about the following expression?
```
4
Σ n
n=1
```

This is proof of concept that is an excuse for using _flex_ and _[bison](https://www.gnu.org/software/bison/manual/)_.
## Usage

To compile this interpreter perform the following,
```bash
make
```

You can find details in the _Makefile_

## References

1. [Using Lex with Yacc](https://silcnitc.github.io/ywl.html) by Ashwathy T Revi, Subisha V
2. flex &amp; bison by John Levine