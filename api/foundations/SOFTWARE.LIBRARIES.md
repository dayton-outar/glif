# Creating and Using Software Libraries

## 1 Introduction

These notes summarize how to create and use static and shared libraries in a UNIX environment. They are designed to be tutorial and elementary. For a more advanced explanation about creating and using library files, I strongly recommend that you read David Wheeler's [Program Library HOWTO](http://tldp.org/HOWTO/Program-Library-HOWTO/index.html).

These notes begin by explaining a bit about software libraries in general, then proceed to describe the differences between static and shared libraries. After this conceptual material, they describe the how-to's about creating and using both types of libraries using the tools available in a GNU-based UNIX system such as Linux. The discussion here is limited to executables and libraries in the _Executable and Link Format_ (ELF), which is the format used by Linux and most UNIX systems at the time of this writing. If you do not know what this means or why it might be important, that is fine; you may safely ignore this.

If you think you do not need the conceptual discussions, you can just "cut to the chase" and jump directly to the appropriate section below, either [5](#5-creating-a-static-library) and [6](#6-using-a-static-library) for static libraries or [7](#7-creating-a-shared-library) and [8](#8-using-a-shared-library) for shared libraries.

## 2 About Libraries

A _software library_, also called a _program library_, is a file containing compiled code and possibly data that can be used by other programs. Libraries are not stand-alone executables - you can not "run" a library. They contain things like functions, type defnitions, and useful constants that other programs can use. You have been using software libraries since your very first "Hello World" program, whether you knew it or not. Whatever function that you used to print those words on the screen was contained in a library, most likely either the C standard I/O library (if you used
used `printf`, for instance), or the C++ iostreams library (if you used the operator of the `cout` `ostream` object.)

Perhaps you might have reached the point where you realize that you are writing useful code, code that you might want to use in more than one project, and that while you could continue to copy those functions into each new project, perhaps you would like to reuse that code in a more efficient way by creating a library file that contains it. If so, read on.

## 3 Static vs Shared Libraries in UNIX

## 4 Identifying Libraries

Static libraries can be recognized by their ending: they end in ".a". Shared libraries have a ".so" extension, possibly with a version number following, such as `librt.so.1`. Both types of libraries start with the prefix "lib" and then have a unique name that identifies that library. So, for example, the standard C++ static library is `libstdc++.a`, and the shared real-time library is `librt.so.1`. The "rt" in the name is short for real-time.

## 5 Creating a Static Library

## 6 Using a Static Library

## 7 Creating a Shared Library

## 8 Using a Shared Library

## 9 Displaying the Contents of a Library

___

&copy; Prof. Stewart Weiss

This work is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).