
I noticed that C++ files had two (2) different type of extensions: `.cc` and `.cpp`. This got me curious to find out if there were any nuances between the two (2).

<sup><strong>NOTE</strong></sup> C++ files are also saved with the following extensions: `.cp`, `.c++`, `cxx`.

I found [this](https://stackoverflow.com/questions/18590135/what-is-the-difference-between-cc-and-cpp-file-suffix)<sup><a href="#fn-1">1</a></sup> entry on StackOverflow.

<blockquote>
<p>Conventions.</p>

Historically, the suffix for a C++ source file was `.C`. This caused a few problems the first time C++ was ported to a system where case wasn't significant in the filename.

Different users adopted different solutions: `.cc`, `.cpp`, `.cxx` and possibly others. Today, outside of the Unix world, it's mostly `.cpp`. Unix seems to use `.cc` more often.

For headers, the situation is even more confusing: for whatever reasons, the earliest C++ authors decided not to distinguish between headers for C and for C++, and used `.h`.

This doesn't cause any problems if there is no C in the project, but when you start having to deal with both, it's usually a good idea to distinguish between the headers which can be used in C (`.h`) and those which cannot (`.hh` or `.hpp`).

In addition, in C++, a lot of users (including myself) prefer keeping the template sources and the inline functions in a separate file. Which, while strictly speaking a header file, tends to get yet another set of conventions (`.inl`, `.tcc` and probably a lot of others).

In the case of headers it makes absolutely no difference to the compiler.

In the case of source files different endings will cause the compiler to assume a different language. But this can normally be overridden, and I used `.cc` with VC++ long before VC++ recognized it as C++.
</blockquote>

Another good explanation was from an entry<sup><a href="#fn-2">2</a></sup> on Quora.

<blockquote>
Programming languages, like human languages, grow out of specific communities of people. The same goes for the various tools that work with programming languages.

In this case, to my knowledge, the `.cc` extension comes from the Unix culture in which Bjarne Stroustrup (the original developer of C++) was initially working. I believe the GNU gcc compiler used `.cc` as its default file extension; I imagine Bjarne considered it to be “one more ‘c’ than ‘.c’”.

The `.cpp` extension, I believe, originated at Microsoft, when it started developing its own C++ compiler. Another variation of `.cpp` is `.cxx` (the X’s represent +’s rotated 45 degrees). At Microsoft, there’s a fairly wide use of both `.cpp` and `.cxx` simply because, **1)** The choice doesn’t really matter (the compiler doesn’t care), and **2)** in any situation where a choice doesn’t really matter, pure randomness will ensure that different people will make different choices. (And therefore, **3)** there will be a lot of gratuitous debate about which arbitrary choice is the best!)

But at Microsoft I have almost never seen any C++ source files with a `.cc` extension. Back when the C++ compilers were first being developed, DOS “8.3” file naming (eight-character filename, three-character extension) was still quite common, and “C++” itself has three characters. Hence, I believe, Microsoft’s choice to use three-character extensions based on the name “C++”.

&hyphen; Rob Jellinghaus
</blockquote>

## References

1. [What is the C++ equivalent of python collections.Counter?](https://stackoverflow.com/questions/53055563/what-is-the-c-equivalent-of-python-collections-counter)
2. [Natural Language Toolkit](https://www.nltk.org/)
___
 <sup id="fn-1">1</sup> [What is the difference between .cc and .cpp file suffix?](https://stackoverflow.com/questions/18590135/what-is-the-difference-between-cc-and-cpp-file-suffix)

 <sup id="fn-2">2</sup> [Why do both .cc and .cpp file extensions exist for C++? What's the history behind this?](https://www.quora.com/Why-do-both-cc-and-cpp-file-extensions-exist-for-C-Whats-the-history-behind-this)