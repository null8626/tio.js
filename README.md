# [tio.js][npm-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![code style: prettier][prettier-image]][prettier-url] [![Build Status][ci-image]][ci-url] [![license][github-license-image]][github-license-url] [![BLAZINGLY FAST!!!][blazingly-fast-image]][blazingly-fast-url]

[npm-image]: https://img.shields.io/npm/v/tio.js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/tio.js
[downloads-image]: https://img.shields.io/npm/dm/tio.js.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/tio.js
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[ci-image]: https://github.com/null8626/tio.js/workflows/CI/badge.svg
[ci-url]: https://github.com/null8626/tio.js/actions/workflows/CI.yml
[github-license-image]: https://img.shields.io/npm/l/tio.js?style=flat-square
[github-license-url]: https://github.com/null8626/tio.js/blob/master/LICENSE
[blazingly-fast-image]: https://img.shields.io/badge/speed-BLAZINGLY%20FAST!!!%20%F0%9F%94%A5%F0%9F%9A%80%F0%9F%92%AA%F0%9F%98%8E-brightgreen.svg?style=flat-square
[blazingly-fast-url]: https://twitter.com/acdlite/status/974390255393505280

A small TypeScript library that lets you evaluate code in a sandboxed environment everywhere.

## Installation

<details>
<summary><b>Node.js</b></summary>

In your shell:

```console
$ npm install tio.js
```

In your code:

```js
import tio from 'tio.js'
```

</details>
<details>
<summary><b>Deno</b></summary>

In your code:

```js
import tio from 'npm:tio.js'
```

</details>
<details>
<summary><b>Bun</b></summary>

In your shell:

```console
$ bun install tio.js
```

In your code:

```js
import tio from 'tio.js'
```

</details>

## Supported languages

Before running into the examples, please note that `tio.js` supports a wide variety of programming languages. These programming languages contain their own IDs that can be used in customizing the programming languages to use before you input the code.

For example `javascript-node` is for running JavaScript in a [Node.js](https://nodejs.org) runtime, `python3` is for running in a [Python 3](https://docs.python.org/3/) environment, etc.

In code, these can be retrieved programmatically by using:

```js
console.log(tio.languages)
```

Therefore, here are the full list of supported programming languages alongside with their friendly names and respective URLs in alphabetical order for your convenience.

<details>
<summary><b>Practical programming languages</b> (260)</summary>

| ID | Name |
|---|---|
| `abc` | [ABC](https://homepages.cwi.nl/~steven/abc/) |
| `abc-assembler` | [ABC-assembler](https://github.com/Ourous/abc-wrapper-linux) |
| `ada-gnat` | [Ada (GNAT)](https://www.gnu.org/software/gnat/) |
| `agda` | [Agda](http://wiki.portal.chalmers.se/agda) |
| `algol68g` | [ALGOL 68 (Genie)](https://jmvdveer.home.xs4all.nl/algol.html) |
| `aliceml` | [Alice ML](https://github.com/aliceml/aliceml) |
| `apl-dyalog` | [APL (Dyalog Unicode)](https://www.dyalog.com/) |
| `apl-dyalog-classic` | [APL (Dyalog Classic)](https://www.dyalog.com/) |
| `apl-dyalog-extended` | [APL (Dyalog Extended)](https://github.com/abrudz/dyalog-apl-extended) |
| `apl-dzaima` | [APL (dzaima/APL)](https://github.com/dzaima/APL) |
| `apl-ngn` | [APL (ngn/apl)](https://gitlab.com/n9n/apl) |
| `appleseed` | [Appleseed](https://github.com/dloscutoff/appleseed) |
| `asperix` | [ASPeRiX](https://github.com/TryItOnline/asperix) |
| `assembly-as` | [Assembly (as, x64, Linux)](https://sourceware.org/binutils/docs/as/index.html) |
| `assembly-fasm` | [Assembly (fasm, x64, Linux)](https://flatassembler.net/) |
| `assembly-gcc` | [Assembly (gcc, x64, Linux)](https://gcc.gnu.org/) |
| `assembly-jwasm` | [Assembly (JWasm, x64, Linux)](https://github.com/JWasm/JWasm) |
| `assembly-nasm` | [Assembly (nasm, x64, Linux)](http://www.nasm.us/) |
| `ats2` | [ATS2](https://sourceforge.net/projects/ats2-lang/) |
| `attache` | [Attache](https://github.com/ConorOBrien-Foxx/Attache) |
| `awk` | [AWK](https://www.gnu.org/software/gawk/manual/gawk.html) |
| `bash` | [Bash](https://www.gnu.org/software/bash/) |
| `bc` | [bc](https://www.gnu.org/software/bc/manual/html_mono/bc.html) |
| `beanshell` | [BeanShell](http://www.beanshell.org/) |
| `boo` | [Boo](http://boo-lang.org/) |
| `bosh` | [bosh](http://schilytools.sourceforge.net/bosh.html) |
| `bracmat` | [Bracmat](https://github.com/BartJongejan/Bracmat) |
| `brat` | [Brat](https://github.com/presidentbeef/brat) |
| `c-clang` | [C (clang)](http://clang.llvm.org/) |
| `c-gcc` | [C (gcc)](https://gcc.gnu.org/) |
| `c-tcc` | [C (tcc)](http://savannah.nongnu.org/projects/tinycc) |
| `caboose` | [Caboose](https://github.com/CabooseLang/Caboose) |
| `cakeml` | [CakeML](https://cakeml.org/) |
| `calc2` | [calc (TTK)](http://ciar.org/ttk/codecloset/calc/) |
| `ceylon` | [Ceylon](https://ceylon-lang.org/) |
| `charm` | [Charm](https://github.com/Aearnus/charm) |
| `chapel` | [Chapel](http://chapel.cray.com/) |
| `checkedc` | [Checked C](https://github.com/Microsoft/checkedc) |
| `cheddar` | [Cheddar](http://cheddar.vihan.org/) |
| `cil-mono` | [CIL (Mono IL assembler)](http://www.mono-project.com/docs/tools+libraries/tools/monodis/) |
| `cixl` | [cixl](https://github.com/basic-gongfu/cixl) |
| `clean` | [Clean](https://github.com/Ourous/curated-clean-linux) |
| `clips` | [CLIPS](http://www.clipsrules.net/) |
| `clisp` | [Common Lisp](http://www.clisp.org/) |
| `clojure` | [Clojure](https://clojure.org/) |
| `cobol-gnu` | [COBOL (GNU)](https://sourceforge.net/projects/open-cobol/) |
| `cobra` | [Cobra](http://cobra-language.com/) |
| `coconut` | [Coconut](http://coconut-lang.org/) |
| `coffeescript` | [CoffeeScript 1](http://coffeescript.org/) |
| `coffeescript2` | [CoffeeScript 2](http://coffeescript.org/) |
| `cpp-clang` | [C++ (clang)](http://clang.llvm.org/) |
| `cpp-gcc` | [C++ (gcc)](https://gcc.gnu.org/) |
| `cpy` | [CPY](https://github.com/vrsperanza/CPY) |
| `cryptol` | [Cryptol](https://www.cryptol.net/) |
| `crystal` | [Crystal](https://crystal-lang.org) |
| `cs-core` | [C# (.NET Core)](https://www.microsoft.com/net/core/platform) |
| `cs-csc` | [C# (Visual C# Compiler)](http://www.mono-project.com/docs/about-mono/releases/5.0.0/#csc) |
| `cs-csi` | [C# (Visual C# Interactive Compiler)](http://www.mono-project.com/docs/about-mono/releases/5.0.0/#csc) |
| `cs-mono` | [C# (Mono C# compiler)](http://www.mono-project.com/docs/about-mono/languages/csharp/) |
| `cs-mono-shell` | [C# (Mono C# Shell)](http://www.mono-project.com/docs/tools+libraries/tools/repl/) |
| `curry-pakcs` | [Curry (PAKCS)](https://www.informatik.uni-kiel.de/~pakcs/) |
| `curry-sloth` | [Curry (Sloth)](http://babel.ls.fi.upm.es/research/Sloth/) |
| `cyclone` | [Cyclone](http://cyclone.thelanguage.org/) |
| `d` | [D](https://dlang.org/) |
| `dafny` | [Dafny](https://github.com/Microsoft/dafny) |
| `dart` | [Dart](https://www.dartlang.org/) |
| `dash` | [Dash](https://wiki.debian.org/Shell) |
| `dc` | [dc](https://www.gnu.org/software/bc/manual/dc-1.05/html_mono/dc.html) |
| `dg` | [dg](https://pyos.github.io/dg/) |
| `dscript` | [DScript](https://github.com/ConorOBrien-Foxx/DScript) |
| `ec` | [eC](https://ecere.org/) |
| `ecpp-c` | [ecpp + C (gcc)](https://github.com/aaronryank/ecpp) |
| `ecpp-cpp` | [ecpp + C++ (gcc)](https://github.com/aaronryank/ecpp) |
| `dyvil` | [Dyvil](https://github.com/dyvil/dyvil) |
| `ed` | [ed](https://www.gnu.org/software/ed/) |
| `egel` | [Egel](https://github.com/egel-lang/egel) |
| `elf` | [ELF (x86/x64, Linux)](https://refspecs.linuxfoundation.org/elf/elf.pdf) |
| `elixir` | [Elixir](https://elixir-lang.org/) |
| `emacs-lisp` | [Emacs Lisp](https://www.gnu.org/software/emacs/manual/eintr.html) |
| `erlang-escript` | [Erlang (escript)](http://erlang.org/doc/man/escript.html) |
| `es` | [es](https://github.com/wryun/es-shell) |
| `euphoria3` | [Euphoria 3](http://rapideuphoria.com/index.html) |
| `euphoria4` | [Euphoria 4](https://openeuphoria.org) |
| `factor` | [Factor](https://factorcode.org/) |
| `fantom` | [Fantom](http://fantom.org/) |
| `farnsworth` | [Farnsworth](https://metacpan.org/pod/Language::Farnsworth) |
| `felix` | [Felix](https://github.com/felix-lang/felix) |
| `fish-shell` | [fish](https://fishshell.com/) |
| `focal` | [FOCAL-69](http://www.cozx.com/dpitts/) |
| `forth-gforth` | [Forth (gforth)](http://www.complang.tuwien.ac.at/forth/gforth/Docs-html/) |
| `fortran-gfortran` | [Fortran (GFortran)](https://gcc.gnu.org/fortran/) |
| `fs-core` | [F# (.NET Core)](https://www.microsoft.com/net/core/platform) |
| `fs-mono` | [F# (Mono)](http://www.mono-project.com/) |
| `funky` | [Funky](https://github.com/TehFlaminTaco/Funky) |
| `funky2` | [Funky 2](https://github.com/TehFlaminTaco/Funky2) |
| `gap` | [GAP](https://www.gap-system.org/) |
| `gema` | [Gema](http://gema.sourceforge.net/) |
| `gnuplot` | [gnuplot](http://www.gnuplot.info/) |
| `go` | [Go](https://golang.org/) |
| `granule` | [Granule](https://github.com/granule-project/granule) |
| `groovy` | [Groovy](http://groovy-lang.org/) |
| `gwion` | [Gwion](https://github.com/fennecdjay/gwion) |
| `hades` | [HadesLang](https://github.com/Azer0s/HadesLang) |
| `haskell` | [Haskell](https://www.haskell.org/) |
| `haskell-gofer` | [Haskell 1.2 (Gofer)](https://github.com/stasoid/Gofer) |
| `haskell-hugs` | [Haskell 98 (Hugs)](https://www.haskell.org/hugs) |
| `haskell-literate` | [Literate Haskell](https://www.haskell.org/onlinereport/literate.html) |
| `haxe` | [Haxe](https://haxe.org) |
| `hobbes` | [Hobbes](https://github.com/Morgan-Stanley/hobbes) |
| `huginn` | [Huginn](https://huginn.org/) |
| `hy` | [Hy](http://hylang.org/) |
| `icon` | [Icon](https://github.com/gtownsend/icon) |
| `idris` | [Idris](https://www.idris-lang.org/) |
| `ink` | [ink](https://github.com/inkle/ink) |
| `io` | [Io](http://iolanguage.org/) |
| `j` | [J](http://jsoftware.com/) |
| `jq` | [jq](https://stedolan.github.io/jq/) |
| `jx` | [Jx](http://www.2bestsystems.com/foundation/j/jx1/) |
| `java-jdk` | [Java (JDK)](http://jdk.java.net/) |
| `java-openjdk` | [Java (OpenJDK 8)](http://openjdk.java.net/) |
| `javascript-babel-node` | [JavaScript (Babel Node)](https://babeljs.io/) |
| `javascript-node` | [JavaScript (Node.js)](https://nodejs.org) |
| `javascript-spidermonkey` | [JavaScript (SpiderMonkey)](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Releases/45) |
| `javascript-v8` | [JavaScript (V8)](https://v8.dev/) |
| `joy` | [Joy](http://www.latrobe.edu.au/humanities/research/research-projects/past-projects/joy-programming-language) |
| `julia` | [Julia 0.4](http://julialang.org/) |
| `julia1x` | [Julia 1.0](http://julialang.org/) |
| `julia5` | [Julia 0.5](http://julialang.org/) |
| `julia6` | [Julia 0.6](http://julialang.org/) |
| `julia7` | [Julia 0.7](http://julialang.org/) |
| `k-kona` | [K (Kona)](https://github.com/kevinlawler/kona) |
| `k-ngn` | [K (ngn/k)](https://bitbucket.org/ngn/k) |
| `k-ok` | [K (oK)](https://github.com/JohnEarnest/ok) |
| `koberi-c` | [Kobeři-C](https://github.com/fpeterek/Koberi-C) |
| `koka` | [Koka](https://github.com/koka-lang/koka) |
| `kotlin` | [Kotlin](https://kotlinlang.org) |
| `ksh` | [ksh](http://www.kornshell.com/) |
| `lean` | [Lean](https://leanprover.github.io/) |
| `lily` | [Lily](http://fascinatedbox.github.io/lily/) |
| `llvm` | [LLVM IR](http://llvm.org/docs/LangRef.html) |
| `lua` | [Lua](https://www.lua.org/) |
| `lua-luajit` | [Lua (LuaJIT)](https://luajit.org/) |
| `lua-openresty` | [Lua (OpenResty)](https://openresty.org/en/) |
| `m4` | [M4](https://www.gnu.org/software/m4/m4.html) |
| `make` | [Make](https://www.gnu.org/software/make/) |
| `mamba` | [Mamba](https://github.com/Gelbpunkt/mamba-lang) |
| `mathematica` | [Wolfram Language (Mathematica)](https://www.wolfram.com/wolframscript/) |
| `mathics` | [Mathics](http://mathics.github.io/) |
| `maxima` | [Maxima](http://maxima.sourceforge.net/) |
| `moonscript` | [Moonscript](https://moonscript.org) |
| `mouse` | [Mouse-79](http://mouse.davidgsimpson.com/mouse79/) |
| `mouse2002` | [Mouse-2002](http://mouse.davidgsimpson.com/mouse2002/) |
| `mouse83` | [Mouse-83](http://mouse.davidgsimpson.com/mouse83/) |
| `mumps` | [MUMPS](http://www.cs.uni.edu/~okane/) |
| `my-basic` | [MY-BASIC](https://github.com/paladin-t/my_basic) |
| `nial` | [Nial](https://github.com/danlm/QNial7) |
| `nim` | [Nim](http://nim-lang.org/) |
| `oberon-07` | [Oberon-07](https://miasap.se/obnc/) |
| `object-pascal-fpc` | [Object Pascal (FPC)](https://www.freepascal.org/) |
| `objective-c-clang` | [Objective-C (clang)](http://clang.llvm.org/) |
| `objective-c-gcc` | [Objective-C (gcc)](https://gcc.gnu.org/onlinedocs/gcc-7.1.0/gcc/Objective-C.html) |
| `occam-pi` | [occam-pi](http://projects.cs.kent.ac.uk/projects/kroc/trac/) |
| `ocaml` | [OCaml](http://www.ocaml.org/) |
| `octave` | [Octave](https://www.gnu.org/software/octave/) |
| `odin` | [Odin](https://github.com/odin-lang/Odin) |
| `osh` | [OSH](https://www.oilshell.org/) |
| `pari-gp` | [Pari/GP](http://pari.math.u-bordeaux.fr/) |
| `pascal-fpc` | [Pascal (FPC)](https://www.freepascal.org/) |
| `perl4` | [Perl 4](https://www.perl.org/) |
| `perl5` | [Perl 5](https://www.perl.org/) |
| `perl5-cperl` | [Perl 5 (cperl)](http://perl11.org/cperl/) |
| `perl6` | [Perl 6](https://github.com/nxadm/rakudo-pkg) |
| `perl6-niecza` | [Perl 6 (Niecza)](https://github.com/sorear/niecza) |
| `phoenix` | [Phoenix](https://github.com/senselogic/PHOENIX) |
| `php` | [PHP](https://php.net/) |
| `physica` | [Physica](https://github.com/Mr-Xcoder/Physica) |
| `picolisp` | [PicoLisp](http://picolisp.com/) |
| `pike` | [Pike](https://pike.lysator.liu.se/) |
| `pilot-pspilot` | [PILOT (psPILOT)](https://github.com/FreeTrav/psPILOT) |
| `pilot-rpilot` | [PILOT (RPilot)](https://github.com/TryItOnline/pilot-rpilot) |
| `pony` | [Pony](https://www.ponylang.org/) |
| `positron` | [Positron](https://github.com/alexander-liao/positron) |
| `postscript-xpost` | [PostScript (xpost)](https://github.com/luser-dr00g/xpost) |
| `powershell` | [PowerShell](https://github.com/TryItOnline/TioSetup/wiki/Powershell) |
| `powershell-core` | [PowerShell Core](https://github.com/PowerShell/PowerShell) |
| `prolog-ciao` | [Prolog (Ciao)](https://ciao-lang.org) |
| `prolog-swi` | [Prolog (SWI)](http://www.swi-prolog.org) |
| `proton` | [Proton](https://github.com/alexander-liao/proton) |
| `proton2` | [Proton 2.0](https://github.com/alexander-liao/proton-2.0) |
| `ps-core` | [P#](https://github.com/p-org/PSharp) |
| `pure` | [Pure](https://github.com/agraef/pure-lang) |
| `purescript` | [PureScript](http://www.purescript.org/) |
| `python1` | [Python 1](https://www.python.org/download/releases/1.6.1/) |
| `python2` | [Python 2](https://docs.python.org/2/) |
| `python2-cython` | [Python 2 (Cython)](http://cython.org/) |
| `python2-iron` | [Python 2 (IronPython)](http://ironpython.net) |
| `python2-jython` | [Python 2 (Jython)](http://www.jython.org) |
| `python2-pypy` | [Python 2 (PyPy)](http://pypy.org/) |
| `python3` | [Python 3](https://docs.python.org/3/) |
| `python38pr` | [Python 3.8 (pre-release)](https://docs.python.org/3.8/) |
| `python3-cython` | [Python 3 (Cython)](http://cython.org/) |
| `python3-pypy` | [Python 3 (PyPy)](http://pypy.org/) |
| `python3-stackless` | [Python 3 (Stackless)](https://github.com/stackless-dev/stackless) |
| `qs-core` | [Q#](https://docs.microsoft.com/en-us/quantum/quantum-qr-intro?view=qsharp-preview) |
| `r` | [R](https://www.r-project.org/) |
| `racket` | [Racket](https://racket-lang.org/) |
| `rad` | [RAD](https://bitbucket.org/zacharyjtaylor/rad) |
| `rapira` | [Rapira](https://github.com/freeduke33/rerap2) |
| `reason` | [Reason](https://reasonml.github.io) |
| `rebol` | [REBOL](http://www.rebol.com/) |
| `rebol3` | [REBOL 3](http://www.rebol.com/rebol3/) |
| `red` | [Red](http://www.red-lang.org) |
| `rexx` | [Rexx (Regina)](http://www.rexx.org/) |
| `ring` | [Ring](https://github.com/ring-lang/ring) |
| `rk` | [rk](https://github.com/aaronryank/rk-lang) |
| `roda` | [Röda](https://github.com/fergusq/roda) |
| `ruby` | [Ruby](https://www.ruby-lang.org/) |
| `rust` | [Rust](https://www.rust-lang.org/) |
| `scala` | [Scala](http://www.scala-lang.org/) |
| `scheme-chez` | [Chez Scheme](https://cisco.github.io/ChezScheme/) |
| `scheme-chicken` | [CHICKEN Scheme](https://www.call-cc.org/) |
| `scheme-gambit` | [Gambit Scheme (gsi)](http://gambitscheme.org) |
| `scheme-guile` | [Guile](https://www.gnu.org/software/guile/) |
| `sed` | [sed 4.2.2](https://www.gnu.org/software/sed/) |
| `sed-gnu` | [sed](https://www.gnu.org/software/sed/) |
| `sfk` | [sfk](http://stahlworks.com/dev/swiss-file-knife.html) |
| `shnap` | [Shnap](https://github.com/ShnapLang/Shnap) |
| `sidef` | [Sidef](https://github.com/trizen/sidef) |
| `simula` | [Simula (cim)](https://directory.fsf.org/wiki/Cim) |
| `sisal` | [SISAL](https://github.com/TryItOnline/sisalc) |
| `sml-mlton` | [Standard ML (MLton)](http://www.mlton.org/) |
| `snobol4` | [SNOBOL4 (CSNOBOL4)](http://www.snobol4.org/csnobol4/) |
| `spim` | [Assembly (MIPS, SPIM)](https://github.com/TryItOnline/spim) |
| `sqlite` | [SQLite](https://www.sqlite.org/) |
| `squirrel` | [Squirrel](http://www.squirrel-lang.org/) |
| `stacked` | [Stacked](https://github.com/ConorOBrien-Foxx/stacked) |
| `swift4` | [Swift](https://developer.apple.com/swift/) |
| `tcl` | [Tcl](http://tcl.tk/) |
| `tcsh` | [tcsh](http://www.tcsh.org/) |
| `templat` | [TemplAt](https://github.com/ConorOBrien-Foxx/Attache/blob/master/TemplAt.md) |
| `typescript` | [TypeScript](https://www.typescriptlang.org) |
| `ubasic` | [uBASIC](https://github.com/EtchedPixels/ubasic) |
| `ursala` | [Ursala](https://github.com/stasoid/Ursala) |
| `vala` | [Vala](https://wiki.gnome.org/Projects/Vala) |
| `vb-core` | [Visual Basic .NET (.NET Core)](https://www.microsoft.com/net/core/platform) |
| `visual-basic-net-mono` | [Visual Basic .NET (Mono)](http://www.mono-project.com/docs/about-mono/languages/visualbasic/) |
| `visual-basic-net-vbc` | [Visual Basic .NET (VBC)](http://www.mono-project.com/docs/about-mono/releases/5.12.0/#vbnet-compiler) |
| `vlang` | [V (vlang.io)](https://vlang.io) |
| `vsl` | [VSL](https://github.com/vsl-lang/VSL) |
| `wasm` | [WebAssembly (WaWrapper)](https://github.com/TryItOnline/wawrapper) |
| `wren` | [Wren](https://github.com/munificent/wren) |
| `yabasic` | [Yabasic](http://www.yabasic.de) |
| `yash` | [yash](https://yash.osdn.jp) |
| `ybc` | [B (ybc)](https://github.com/Leushenko/ybc) |
| `z3` | [Z3](https://github.com/Z3Prover/z3) |
| `zephyr` | [Zephyr](https://github.com/dloscutoff/zephyr) |
| `zig` | [Zig](https://ziglang.org/) |
| `zkl` | [zkl](http://www.zenkinetic.com/zkl.html) |
| `zoidberg` | [Zoidberg](https://metacpan.org/pod/Zoidberg) |
| `zsh` | [Zsh](https://www.zsh.org/) |

</summary>
</details>
<details>
<summary><b>Esoteric programming languages</b> (421)</summary>

| ID | Name |
|---|---|
| `4` | [4](https://github.com/urielieli/py-four) |
| `7` | [7](https://esolangs.org/wiki/7) |
| `33` | [33](https://github.com/TheOnlyMrCat/33) |
| `99` | [99](https://github.com/TryItOnline/99) |
| `05ab1e` | [05AB1E (legacy)](https://github.com/Adriandmen/05AB1E/tree/fb4a2ce2bce6660e1a680a74dd61b72c945e6c3b) |
| `1l-a` | [1L_a](https://github.com/TryItOnline/1L_a) |
| `1l-aoi` | [1L_AOI](https://github.com/stasoid/1L_AOI) |
| `2dfuck` | [2DFuck](https://gitlab.com/TheWastl/2DFuck) |
| `2l` | [2L](https://github.com/TryItOnline/2L) |
| `2sable` | [2sable](https://github.com/Adriandmen/2sable) |
| `3var` | [3var](https://esolangs.org/wiki/3var) |
| `a-gram` | [a-gram](https://github.com/p1xels/a-gram) |
| `a-pear-tree` | [A Pear Tree](https://esolangs.org/wiki/A_Pear_Tree) |
| `accbb` | [Acc!!](https://github.com/dloscutoff/Esolangs/tree/master/Acc!!) |
| `aceto` | [Aceto](https://github.com/aceto/aceto) |
| `actually` | [Actually](https://github.com/Mego/Seriously) |
| `adapt` | [Adapt](https://github.com/cairdcoinheringaahing/adapt) |
| `addpp` | [Add++](https://github.com/cairdcoinheringaahing/AddPlusPlus) |
| `adjust` | [ADJUST](https://github.com/TryItOnline/adjust) |
| `agony` | [Agony](https://github.com/royvanrijn/JAgony) |
| `ahead` | [Ahead](https://github.com/ajc2/ahead) |
| `aheui` | [Aheui (esotope)](https://github.com/aheui/pyaheui) |
| `alchemist` | [Alchemist](https://github.com/bforte/Alchemist) |
| `alice` | [Alice](https://github.com/m-ender/alice) |
| `alice-bob` | [Alice & Bob](https://github.com/bforte/alice-bob) |
| `alphabeta` | [AlphaBeta](https://github.com/TryItOnline/alphabeta) |
| `alphabetti-spaghetti` | [Alphabetti spaghetti](https://github.com/stasoid/Alphabetti-spaghetti) |
| `alphuck` | [Alphuck](https://github.com/TryItOnline/brainfuck) |
| `alumin` | [Alumin](https://github.com/ConorOBrien-Foxx/Alumin) |
| `amnesiac-from-minsk` | [The Amnesiac From Minsk](https://github.com/pavelbraginskiy/TheAmnesiacFromMinsk) |
| `ante` | [Ante](https://github.com/michaeldv/ante) |
| `anyfix` | [anyfix](https://github.com/alexander-liao/anyfix) |
| `arble` | [ARBLE](https://github.com/TehFlaminTaco/ARBLE) |
| `archway` | [Archway](https://github.com/TryItOnline/archway) |
| `archway2` | [Archway2](https://github.com/TryItOnline/archway) |
| `arcyou` | [Arcyóu](https://github.com/Nazek42/arcyou) |
| `arnoldc` | [ArnoldC](https://lhartikk.github.io/ArnoldC/) |
| `asciidots` | [AsciiDots](https://github.com/aaronduino/asciidots) |
| `aubergine` | [Aubergine](https://esolangs.org/wiki/Aubergine) |
| `axo` | [axo](https://esolangs.org/wiki/Axo) |
| `backhand` | [Backhand](https://github.com/GuyJoKing/Backhand) |
| `bctbww` | [Bitwise Cyclic Tag But Way Worse](https://github.com/MilkyWay90/Bitwise-Cyclic-Tag-But-Way-Worse) |
| `bctbww2` | [Bitwise Cyclic Tag But Way Worse 2.0](https://github.com/MilkyWay90/Bitwise-Cyclic-Tag-But-Way-Worse) |
| `beam` | [Beam](https://github.com/ETHproductions/beam-js) |
| `bean` | [Bean](https://github.com/patrickroberts/bean) |
| `beatnik` | [Beatnik](https://esolangs.org/wiki/Beatnik) |
| `beeswax` | [Beeswax](https://github.com/m-lohmann/BeeswaxEsolang.jl) |
| `befunge` | [Befunge-93](https://github.com/catseye/Befunge-93) |
| `befunge-93-fbbi` | [Befunge-93 (FBBI)](https://github.com/catseye/FBBI) |
| `befunge-93-mtfi` | [Befunge-93 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `befunge-93-pyfunge` | [Befunge-93 (PyFunge)](https://pythonhosted.org/PyFunge/) |
| `befunge-96-mtfi` | [Befunge-96 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `befunge-97-mtfi` | [Befunge-97 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `befunge-98` | [Befunge-98 (FBBI)](https://github.com/catseye/FBBI) |
| `befunge-98-pyfunge` | [Befunge-98 (PyFunge)](https://pythonhosted.org/PyFunge/) |
| `bit` | [Bit](https://github.com/FireCubez/bit) |
| `bitbitjump` | [BitBitJump](https://github.com/TryItOnline/bitbitjump) |
| `bitch` | [bitch](https://github.com/Helen0903/bitch) |
| `bitch-bith` | [bitch (bit-h)](https://github.com/int-e/bits/tree/master/hs) |
| `bitch-shifty` | [bitch (shifty)](https://github.com/int-e/bits/tree/master/cc) |
| `bitchanger` | [BitChanger](https://github.com/TryItOnline/bitchanger) |
| `bitcycle` | [BitCycle](https://github.com/dloscutoff/esolangs/tree/master/BitCycle) |
| `bitwise` | [Bitwise](https://github.com/aaronryank/bitwise) |
| `blak` | [Black (blak)](https://github.com/TryItOnline/blak) |
| `blc` | [Binary Lambda Calculus](https://tromp.github.io/cl/cl.html) |
| `boolfuck` | [Boolfuck](https://github.com/TryItOnline/boolfuck) |
| `bot-engine` | [Bot Engine](https://github.com/SuperJedi224/Bot-Engine) |
| `brachylog` | [Brachylog v1](https://github.com/JCumin/Brachylog/releases) |
| `brachylog2` | [Brachylog](https://github.com/JCumin/Brachylog) |
| `braille` | [Braille](https://github.com/TryItOnline/braille) |
| `brain-flak` | [Brain-Flak](https://github.com/DJMcMayhem/Brain-Flak) |
| `brainbash` | [Brainbash](https://github.com/ConorOBrien-Foxx/Brainbash) |
| `brainbool` | [brainbool](https://github.com/TryItOnline/brainfuck) |
| `brainflump` | [BrainFlump](https://github.com/dylanrenwick/BrainFlump) |
| `brainfuck` | [brainfuck](https://github.com/TryItOnline/brainfuck) |
| `braingolf` | [Braingolf](https://github.com/dylanrenwick/braingolf) |
| `brainhack` | [Brain-Flak (BrainHack)](https://github.com/Flakheads/BrainHack) |
| `brainlove` | [Brainlove](https://github.com/TryItOnline/brainfuck) |
| `brainspace` | [BrainSpace](https://code.google.com/archive/p/brainspace/) |
| `brian-chuck` | [Brian & Chuck](https://github.com/m-ender/brian-chuck) |
| `broccoli` | [Broccoli](https://github.com/broccoli-lang/broccoli) |
| `bubblegum` | [Bubblegum](https://esolangs.org/wiki/Bubblegum) |
| `burlesque` | [Burlesque](https://github.com/FMNSSun/Burlesque) |
| `buzzfizz` | [BuzzFizz](https://esolangs.org/wiki/BuzzFizz) |
| `bwfuckery` | [Bitwise Fuckery](https://github.com/cairdcoinheringaahing/Bitwise-Fuckery) |
| `canvas` | [Canvas](https://github.com/dzaima/Canvas) |
| `cardinal` | [Cardinal](https://www.esolangs.org/wiki/Cardinal) |
| `carol-dave` | [Carol & Dave](https://github.com/bforte/carol-dave) |
| `carrot` | [Carrot](https://github.com/kritixilithos/Carrot) |
| `cascade` | [Cascade](https://github.com/GuyJoKing/Cascade) |
| `catholicon` | [Catholicon](https://github.com/okx-code/Catholicon) |
| `cauliflower` | [Cauliflower](https://github.com/broccoli-lang/broccoli) |
| `ceres` | [Ceres](https://github.com/alexander-liao/ceres) |
| `chain` | [Chain](https://github.com/ConorOBrien-Foxx/Chain) |
| `chef` | [Chef](http://search.cpan.org/~smueller/Acme-Chef/) |
| `changeling` | [Changeling](https://github.com/DennisMitchell/shapescript) |
| `charcoal` | [Charcoal](https://github.com/somebody1234/Charcoal) |
| `check` | [Check](https://github.com/ScratchMan544/check-lang) |
| `chip` | [Chip](https://github.com/Phlarx/chip) |
| `cinnamon-gum` | [Cinnamon Gum](https://github.com/quartata/cinnamon-gum) |
| `cjam` | [CJam](https://sourceforge.net/p/cjam) |
| `clam` | [Clam](https://github.com/dylanrenwick/Clam) |
| `commata` | [,,,](https://github.com/totallyhuman/commata) |
| `commentator` | [Commentator](https://github.com/cairdcoinheringaahing/Commentator) |
| `commercial` | [Commercial](https://github.com/TryItOnline/commercial) |
| `condit` | [Condit](https://github.com/TryItOnline/condit) |
| `convex` | [Convex](https://github.com/GamrCorps/Convex) |
| `cood` | [Cood](https://github.com/jesobreira/cood/tree/php-interpreter) |
| `corea` | [Corea](https://github.com/ConorOBrien-Foxx/Corea) |
| `cow` | [COW](https://bigzaphod.github.io/COW/) |
| `cquents` | [cQuents](https://github.com/stestoltz/cQuents) |
| `crayon` | [Crayon](https://github.com/ETHproductions/crayon) |
| `csl` | [CSL](https://github.com/jammy-dodgers/CSL) |
| `cubically` | [Cubically](https://github.com/aaronryank/cubically) |
| `cubix` | [Cubix](https://github.com/ETHproductions/cubix) |
| `curlyfrick` | [Curlyfrick](https://github.com/JonoCode9374/CFEsolang) |
| `cy` | [Cy](https://github.com/cyoce/Cy) |
| `d2` | [D2](https://github.com/ConorOBrien-Foxx/Attache/blob/master/D2.md) |
| `deadfish-` | [Deadfish~](https://github.com/TryItOnline/deadfish-) |
| `decimal` | [Decimal](https://github.com/aaronryank/Decimal) |
| `delimit` | [Del|m|t](https://github.com/MistahFiggins/Delimit) |
| `deorst` | [Deorst](https://github.com/cairdcoinheringaahing/Deorst) |
| `dirty` | [Dirty](https://github.com/Ourous/dirty) |
| `detour` | [Detour](https://github.com/cyoce/detour) |
| `dobela` | [DOBELA](https://deewiant.iki.fi/projects/dobelx64/) |
| `dobela-dobcon` | [DOBELA (dobcon)](https://github.com/stasoid/DOBELA) |
| `dodos` | [Dodos](https://github.com/DennisMitchell/dodos) |
| `dreaderef` | [Dreaderef](https://github.com/ScratchMan544/Dreaderef) |
| `drive-in-window` | [Drive-In Window](https://github.com/TryItOnline/drive-in-window) |
| `dstack` | [DStack](https://github.com/alejandrocoria/DStack) |
| `eacal` | [eacal](https://github.com/ConorOBrien-Foxx/eacal) |
| `ecndpcaalrlp` | [!@#$%^&*()_+](https://github.com/ConorOBrien-Foxx/ecndpcaalrlp) |
| `element` | [Element](https://github.com/PhiNotPi/Element) |
| `elvm-ir` | [ELVM-IR](https://github.com/shinh/elvm) |
| `emmental` | [Emmental](https://github.com/catseye/Emmental) |
| `emoji` | [Emoji](https://esolangs.org/wiki/Emoji) |
| `emoji-gramming` | [Emoji-gramming](https://github.com/TryItOnline/Emoji-gramming) |
| `emojicode` | [Emojicode 0.5](http://www.emojicode.org/) |
| `emojicode6` | [Emojicode](http://www.emojicode.org/) |
| `emojicoder` | [EmojiCoder](https://github.com/TryItOnline/EmojiCoder) |
| `emotifuck` | [emotifuck](https://github.com/Romulus10/emotif___) |
| `emotinomicon` | [Emotinomicon](https://github.com/ConorOBrien-Foxx/Emotinomicon) |
| `empty-nest` | [(())](https://esolangs.org/wiki/(())) |
| `enlist` | [Enlist](https://github.com/alexander-liao/enlist) |
| `esopunk` | [ESOPUNK](https://gitlab.com/Blacksilver/pyesopunk) |
| `eta` | [ETA](http://www.miketaylor.org.uk/tech/eta/doc/) |
| `evil` | [evil](https://web.archive.org/web/20070103000858/www1.pacific.edu/~twrensch/evil/index.html) |
| `explode` | [Explode](https://github.com/stestoltz/Explode) |
| `extended-brainfuck-type-i` | [Extended Brainfuck Type I](https://github.com/TryItOnline/brainfuck) |
| `extrac` | [ExtraC](https://github.com/ConorOBrien-Foxx/extrac) |
| `face` | [face](https://github.com/KeyboardFire/face) |
| `false` | [FALSE](https://github.com/somebody1234/FALSE) |
| `fernando` | [FerNANDo](https://esolangs.org/wiki/FerNANDo) |
| `feu` | [FEU](https://github.com/TryItOnline/feu) |
| `fimpp` | [FIM++](https://github.com/avian2/fimpp) |
| `fish` | [><>](https://esolangs.org/wiki/Fish) |
| `fission` | [Fission](https://github.com/C0deH4cker/Fission) |
| `fission2` | [Fission 2](https://github.com/C0deH4cker/Fission) |
| `flipbit` | [Flipbit](https://github.com/cairdcoinheringaahing/Flipbit) |
| `floater` | [Floater](https://github.com/Zom-B/Floater) |
| `flobnar` | [Flobnar](https://github.com/Reconcyl/flobnar) |
| `foam` | [Foam](https://github.com/Reconcyl/foam-lang) |
| `foo` | [Foo](https://esolangs.org/wiki/Foo) |
| `forget` | [Forget](https://github.com/BenjaminUrquhart/Forget) |
| `forked` | [Forked](https://github.com/aaronryank/Forked) |
| `forte` | [Forte](https://github.com/judofyr/forter) |
| `fourier` | [Fourier](https://github.com/beta-decay/Fourier) |
| `fractran` | [FRACTRAN](https://github.com/DennisMitchell/ffi) |
| `fueue` | [Fueue](https://github.com/TryItOnline/fueue) |
| `funciton` | [Funciton](https://github.com/Timwi/Funciton) |
| `functoid` | [Functoid](https://github.com/bforte/Functoid) |
| `fynyl` | [Fynyl](https://github.com/ConorOBrien-Foxx/Fynyl) |
| `gaia` | [Gaia](https://github.com/splcurran/Gaia) |
| `gaotpp` | [Gaot++](https://github.com/TryItOnline/gaotpp) |
| `geo` | [Geo](https://github.com/cairdcoinheringaahing/Orst-Geo) |
| `glypho` | [Glypho](https://web.archive.org/web/20060621185740/http://www4.ncsu.edu/~bcthomp2/glypho.txt) |
| `glypho-shorthand` | [Glypho (shorthand)](https://web.archive.org/web/20060621185740/http://www4.ncsu.edu/~bcthomp2/glypho.txt) |
| `golfish` | [Gol><>](https://github.com/Sp3000/Golfish) |
| `golfscript` | [GolfScript](http://www.golfscript.com/golfscript/) |
| `grass` | [Grass](https://github.com/TryItOnline/grass) |
| `grime` | [Grime](https://github.com/iatorm/grime) |
| `gs2` | [GS2](https://github.com/nooodl/gs2) |
| `hasm` | [hASM](https://github.com/pavelbraginskiy/hASM) |
| `haystack` | [Haystack](https://github.com/kade-robertson/haystack) |
| `hbcht` | [Half-Broken Car in Heavy Traffic](https://git.metanohi.name/hbcht.git/) |
| `hdbf` | [Hyper-Dimensional Brainfuck](https://github.com/Property404/hdbf) |
| `hexagony` | [Hexagony](https://github.com/m-ender/hexagony) |
| `hodor` | [Hodor](https://github.com/hummingbirdtech/hodor) |
| `homespring` | [Homespring](https://github.com/TryItOnline/homespring) |
| `hspal` | [Hexadecimal Stacking Pseudo-Assembly Language](https://github.com/ConorOBrien-Foxx/Hexadecimal-Stacking-Pseudo-Assembly-Language) |
| `husk` | [Husk](https://github.com/barbuz/Husk) |
| `i` | [I](https://github.com/mlochbaum/ILanguage) |
| `iag` | [iag](https://github.com/TryItOnline/iag) |
| `incident` | [Incident](https://github.com/TryItOnline/incident) |
| `intercal` | [INTERCAL](http://www.catb.org/~esr/intercal/) |
| `jael` | [JAEL](https://github.com/eduardoHoefel/JAEL) |
| `j-uby` | [J-uby](https://github.com/cyoce/J-uby) |
| `japt` | [Japt](https://github.com/ETHproductions/japt) |
| `jelly` | [Jelly](https://github.com/DennisMitchell/jelly) |
| `jellyfish` | [Jellyfish](https://github.com/iatorm/jellyfish) |
| `kavod` | [kavod](https://github.com/ConorOBrien-Foxx/kavod) |
| `keg` | [Keg](https://github.com/JonoCode9374/Keg) |
| `kipple-cipple` | [Kipple (cipple)](https://github.com/graue/esofiles/tree/master/kipple) |
| `klein` | [Klein](https://github.com/Wheatwizard/Klein) |
| `krrp` | [krrp](https://github.com/jfrech/krrp) |
| `l33t` | [l33t](https://github.com/TryItOnline/l33t) |
| `labyrinth` | [Labyrinth](https://github.com/m-ender/labyrinth) |
| `lmbm` | [Lean Mean Bean Machine](https://github.com/dylanrenwick/lmbm) |
| `lnusp` | [LNUSP](https://github.com/TryItOnline/lnusp) |
| `locksmith` | [Locksmith](https://github.com/ConorOBrien-Foxx/Locksmith) |
| `logicode` | [Logicode](https://github.com/LogicodeLang/Logicode) |
| `lolcode` | [LOLCODE](http://lolcode.org/) |
| `lost` | [Lost](https://github.com/Wheatwizard/Lost) |
| `lower` | [LOWER](https://github.com/ConorOBrien-Foxx/LOWER) |
| `ly` | [Ly](https://github.com/LyricLy/Ly) |
| `m` | [M](https://github.com/DennisMitchell/m) |
| `machinecode` | [MachineCode](https://github.com/aaronryank/MachineCode) |
| `malbolge` | [Malbolge](https://github.com/TryItOnline/malbolge) |
| `malbolge-unshackled` | [Malbolge Unshackled](https://github.com/TryItOnline/malbolge-unshackled) |
| `mariolang` | [MarioLANG](https://github.com/tomsmeding/MarioLANG) |
| `mascarpone` | [Mascarpone](https://github.com/catseye/Mascarpone) |
| `mathgolf` | [MathGolf](https://github.com/maxbergmark/mathgolf) |
| `matl` | [MATL](https://github.com/lmendo/MATL) |
| `maverick` | [Maverick](https://github.com/ConorOBrien-Foxx/Maverick) |
| `maybelater` | [MaybeLater](https://github.com/TehFlaminTaco/MaybeLater) |
| `memory-gap` | [Memory GAP](https://github.com/ConorOBrien-Foxx/memory-GAP) |
| `milambda` | [MiLambda](https://github.com/TryItOnline/MiLambda) |
| `milky-way` | [Milky Way](https://github.com/zachgates/Milky-Way) |
| `minefriff` | [MineFriff](https://github.com/JonoCode9374/Minefriff) |
| `minimal-2d` | [Minimal-2D](https://esolangs.org/wiki/Minimal-2D) |
| `miniml` | [miniML](https://github.com/feresum/acml) |
| `minkolang` | [Minkolang](https://github.com/elendiastarman/Minkolang) |
| `mirror` | [Mirror](https://github.com/alexander-liao/mirror) |
| `momema` | [Momema](https://github.com/ScratchMan544/momema) |
| `monkeys` | [Monkeys](https://github.com/TryItOnline/monkeys) |
| `moorhens` | [Moorhens](https://github.com/Wheatwizard/Moorhen/tree/v2.0-dev) |
| `mornington-crescent` | [Mornington Crescent](https://github.com/padarom/esoterpret) |
| `mu6` | [µ6](https://github.com/bforte/mu6) |
| `muriel` | [Muriel](https://github.com/catseye/Muriel) |
| `my` | [MY](https://bitbucket.org/zacharyjtaylor/my-language) |
| `nameless` | [nameless language](https://github.com/bforte/nameless-lang) |
| `nandy` | [Nandy](https://github.com/EdgyNerd/Nandy) |
| `nikud` | [Nikud](https://github.com/bary12/Nikud) |
| `neim` | [Neim](https://github.com/okx-code/Neim) |
| `neutrino` | [Neutrino](https://github.com/alexander-liao/neutrino) |
| `nhohnhehr` | [Nhohnhehr](https://github.com/catseye/Nhohnhehr) |
| `no` | [No](https://github.com/cairdcoinheringaahing/Uno-No) |
| `noether` | [Noether](https://github.com/beta-decay/Noether) |
| `nqt` | [NotQuiteThere](https://github.com/cairdcoinheringaahing/NotQuiteThere) |
| `ntfjc` | [NTFJ (NTFJC)](https://github.com/ConorOBrien-Foxx/ntfjc) |
| `numberwang` | [Numberwang](https://esolangs.org/wiki/Numberwang_(brainfuck_derivative)) |
| `oasis` | [Oasis](https://github.com/Adriandmen/Oasis) |
| `obcode` | [ObCode](https://gitlab.com/TheWastl/ObCode) |
| `ohm` | [Ohm](https://github.com/nickbclifford/Ohm/tree/v1) |
| `ohm2` | [Ohm v2](https://github.com/nickbclifford/Ohm) |
| `oml` | [OML](https://github.com/ConorOBrien-Foxx/OML) |
| `ooocode` | [oOo CODE](https://github.com/TryItOnline/brainfuck) |
| `oration` | [Oration](https://github.com/ConorOBrien-Foxx/Assorted-Programming-Languages/tree/master/oration) |
| `ork` | [ORK](https://github.com/TryItOnline/ork) |
| `orst` | [Orst](https://github.com/cairdcoinheringaahing/Orst-Geo) |
| `osabie` | [05AB1E](https://github.com/Adriandmen/05AB1E) |
| `pain-flak` | [Pain-Flak](https://github.com/Cis112233/Pain-Flak) |
| `paradoc` | [Paradoc](https://github.com/betaveros/paradoc) |
| `parenthesis-hell` | [Parenthesis Hell](https://github.com/qpliu/esolang/tree/master/ph) |
| `parenthetic` | [Parenthetic](https://github.com/cammckinnon/Parenthetic) |
| `path` | [PATH](https://sourceforge.net/projects/pathlang/) |
| `pbrain` | [pbrain](http://www.parkscomputing.com/applications/pbrain/) |
| `phooey` | [Phooey](https://github.com/ConorOBrien-Foxx/Phooey) |
| `piet` | [Piet](https://github.com/cincodenada/bertnase_npiet) |
| `pingpong` | [PingPong](https://github.com/graue/esofiles/tree/master/pingpong) |
| `pip` | [Pip](https://github.com/dloscutoff/pip) |
| `pixiedust` | [Pixiedust](https://github.com/The-Snide-Sniper/pixiedust) |
| `pl` | [pl](https://github.com/quartata/pl-lang) |
| `postl` | [PostL](https://github.com/alexander-liao/postfix-lang) |
| `prelude` | [Prelude](https://esolangs.org/wiki/Prelude) |
| `premier` | [Premier](https://github.com/ConorOBrien-Foxx/Premier) |
| `preproc` | [Preproc](https://gitlab.com/PavelBraginskiy/preproc) |
| `purple` | [Purple](https://esolangs.org/wiki/Purple) |
| `pushy` | [Pushy](https://github.com/FTcode/Pushy) |
| `puzzlang` | [Puzzlang](https://github.com/AndoDaan/EsotericLanguages/blob/master/Puzzlang/InPuzzlang.lua) |
| `pyke` | [Pyke](https://github.com/muddyfish/PYKE) |
| `pylons` | [Pylons](https://github.com/morganthrapp/Pylons-lang) |
| `pyn-tree` | [PynTree](https://github.com/alexander-liao/pyn-tree) |
| `pyon` | [Pyon](https://github.com/alexander-liao/pyon) |
| `pyramid-scheme` | [Pyramid Scheme](https://github.com/ConorOBrien-Foxx/Pyramid-Scheme) |
| `pyret` | [Pyret](https://www.pyret.org/) |
| `pyt` | [Pyt](https://github.com/mudkip201/pyt) |
| `pyth` | [Pyth](https://github.com/isaacg1/pyth) |
| `qqq` | [???](https://github.com/ararslan/qqq-lang) |
| `quadr` | [QuadR](https://github.com/abrudz/QuadRS) |
| `quadrefunge-97-mtfi` | [Quadrefunge-97 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `quads` | [QuadS](https://github.com/abrudz/QuadRS) |
| `quarterstaff` | [Quarterstaff](https://github.com/Destructible-Watermelon/Quarterstaff) |
| `quintefunge-97-mtfi` | [Quintefunge-97 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `rail` | [Rail](https://esolangs.org/wiki/Rail) |
| `random-brainfuck` | [Random Brainfuck](https://github.com/TryItOnline/brainfuck) |
| `re-direction` | [Re:direction](https://esolangs.org/wiki/Re:direction) |
| `recursiva` | [Recursiva](https://github.com/officialaimm/recursiva) |
| `reng` | [Reng](https://github.com/ConorOBrien-Foxx/Reng) |
| `reregex` | [ReRegex](https://github.com/TehFlaminTaco/ReRegex) |
| `res` | [res](https://github.com/A-ee/res) |
| `resplicate` | [ResPlicate](https://github.com/TryItOnline/ResPlicate) |
| `reticular` | [Reticular](https://github.com/ConorOBrien-Foxx/reticular) |
| `retina` | [Retina 0.8.2](https://github.com/m-ender/retina/wiki/The-Language/a950ad7d925ec9316e3e2fb2cf5d49fd15d23e3d) |
| `retina1` | [Retina](https://github.com/m-ender/retina/wiki/The-Language) |
| `return` | [RETURN](https://github.com/TryItOnline/return) |
| `rockstar` | [Rockstar](https://github.com/yanorestes/rockstar-py) |
| `roop` | [ROOP](https://github.com/alejandrocoria/ROOP) |
| `ropy` | [Ropy](https://github.com/TryItOnline/ropy) |
| `rotor` | [Rotor](https://github.com/quartata/rotor-lang) |
| `rprogn` | [RProgN](https://github.com/TehFlaminTaco/Reverse-Programmer-Notation) |
| `rprogn-2` | [RProgN 2](https://github.com/TehFlaminTaco/RProgN-2) |
| `runic` | [Runic Enchantments](https://github.com/Draco18s/RunicEnchantments/tree/Console) |
| `rutger` | [Rutger](https://github.com/cairdcoinheringaahing/Rutger) |
| `sad-flak` | [Sad-Flak](https://github.com/Destructible-Watermelon/Sad-Flak) |
| `sakura` | [Sakura](https://github.com/TryItOnline/sakura) |
| `sbf` | [Symbolic Brainfuck](https://github.com/KelsonBall/Esolangs.Sbf) |
| `seed` | [Seed](https://github.com/TryItOnline/seed) |
| `septefunge-97-mtfi` | [Septefunge-97 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `seriously` | [Seriously](https://github.com/Mego/Seriously/tree/v1) |
| `sesos` | [Sesos](https://github.com/DennisMitchell/sesos) |
| `set` | [Set](https://github.com/somebody1234/Set) |
| `sexefunge-97-mtfi` | [Sexefunge-97 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `shapescript` | [ShapeScript](https://github.com/DennisMitchell/shapescript) |
| `shortc` | [shortC](https://github.com/aaronryank/shortC) |
| `shove` | [Shove](https://github.com/TryItOnline/shove) |
| `shp` | [;#+](https://github.com/ConorOBrien-Foxx/shp) |
| `shtriped` | [Shtriped](https://github.com/HelkaHomba/shtriped) |
| `silos` | [S.I.L.O.S](https://github.com/rjhunjhunwala/S.I.L.O.S) |
| `silberjoder` | [Silberjoder](https://github.com/quintopia/Silberjoder) |
| `simplefunge` | [Simplefunge](https://github.com/TryItOnline/simplefunge) |
| `simplestack` | [Implicit](https://github.com/aaronryank/Implicit) |
| `simplex` | [Simplex](https://github.com/ConorOBrien-Foxx/Simplex) |
| `sisi` | [Sisi](https://github.com/dloscutoff/Esolangs/tree/master/Sisi) |
| `slashes` | [///](https://esolangs.org/wiki////) |
| `smbf` | [Self-modifying Brainfuck](https://soulsphere.org/hacks/smbf/) |
| `smol` | [smol](https://github.com/ConorOBrien-Foxx/smol) |
| `snails` | [Snails](https://github.com/feresum/PMA) |
| `snowman` | [Snowman](http://github.com/KeyboardFire/snowman-lang) |
| `snusp` | [SNUSP (Modular)](https://github.com/TryItOnline/snusp) |
| `snusp-bloated` | [SNUSP (Bloated)](https://github.com/TryItOnline/Bloated-SNUSP) |
| `snuspi` | [SNUSP (Snuspi)](https://github.com/graue/esofiles/tree/master/snusp) |
| `somme` | [Somme](https://github.com/ConorOBrien-Foxx/Somme) |
| `spaced` | [Spaced](https://github.com/ConorOBrien-Foxx/spaced) |
| `spl` | [Shakespeare Programming Language](https://github.com/TryItOnline/spl) |
| `spoon` | [Spoon](https://github.com/TryItOnline/spoon) |
| `stackcats` | [Stack Cats](https://github.com/m-ender/stackcats) |
| `starfish` | [*><>](https://github.com/redstarcoder/go-starfish) |
| `starry` | [Starry](https://esolangs.org/wiki/Starry) |
| `stax` | [Stax](https://github.com/tomtheisen/stax) |
| `stencil` | [Stencil](https://github.com/abrudz/Stencil) |
| `stones` | [Stones](https://github.com/cheezgi/stones) |
| `str` | [str](https://github.com/ConorOBrien-Foxx/str) |
| `straw` | [Straw](https://github.com/TryItOnline/straw) |
| `subskin` | [Subskin](https://github.com/TryItOnline/subskin) |
| `sumerian` | [Sumerian](https://github.com/beta-decay/Sumerian) |
| `supermariolang` | [SuperMarioLang](https://github.com/charliealejo/SuperMarioLang) |
| `superstack` | [Super Stack!](https://github.com/TryItOnline/superstack) |
| `surface` | [Surface](https://github.com/TryItOnline/surface) |
| `swap` | [Swap](https://github.com/splcurran/Swap) |
| `syms` | [Syms](https://github.com/CatsAreFluffy/syms) |
| `symbolic-python` | [Symbolic Python](https://github.com/FTcode/Symbolic-Python) |
| `taco` | [TacO](https://github.com/TehFlaminTaco/TacO) |
| `tampio` | [Tampio (functional)](https://github.com/fergusq/tampio/tree/functional) |
| `tampioi` | [Tampio (imperative)](https://github.com/fergusq/tampio) |
| `tamsin` | [Tamsin](https://github.com/catseye/Tamsin) |
| `tapebagel` | [TapeBagel](https://github.com/TryItOnline/tapebagel) |
| `taxi` | [Taxi](https://bigzaphod.github.io/Taxi/) |
| `templates` | [Templates Considered Harmful](https://github.com/feresum/tmp-lang) |
| `thing` | [Thing](https://gitlab.com/gnu-nobody/Thinglang) |
| `threead` | [Threead](https://github.com/TehFlaminTaco/Threead) |
| `thue` | [Thue](https://esolangs.org/wiki/Thue) |
| `thutu` | [Thutu](https://esolangs.org/wiki/Thutu) |
| `tidy` | [Tidy](https://github.com/ConorOBrien-Foxx/Tidy) |
| `tincan` | [TinCan](https://github.com/TryItOnline/tincan) |
| `tinybf` | [tinyBF](https://github.com/TryItOnline/brainfuck) |
| `tinylisp` | [tinylisp](https://github.com/dloscutoff/Esolangs/tree/master/tinylisp) |
| `tir` | [Tir](https://github.com/ConorOBrien-Foxx/Tir) |
| `tis` | [TIS](https://github.com/Phlarx/tis) |
| `toi` | [Toi](https://github.com/kritixilithos/toi) |
| `tmbww` | [Turing Machine But Way Worse](https://github.com/MilkyWay90/Turing-Machine-But-Way-Worse) |
| `transcript` | [TRANSCRIPT](https://web.archive.org/web/20071018030927/http://www.corknut.org/code/transcript/) |
| `trefunge-97-mtfi` | [Trefunge-97 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `trefunge-98-pyfunge` | [Trefunge-98 (PyFunge)](https://pythonhosted.org/PyFunge/) |
| `triangular` | [Triangular](https://github.com/aaronryank/triangular) |
| `triangularity` | [Triangularity](https://github.com/Mr-Xcoder/Triangularity) |
| `trigger` | [Trigger](http://yiap.nfshost.com/esoteric/trigger/trigger.html) |
| `triple-threat` | [Triple Threat](https://github.com/TryItOnline/Triple-Threat) |
| `trumpscript` | [TrumpScript](https://github.com/samshadwell/TrumpScript) |
| `turtled` | [Turtlèd](https://github.com/Destructible-Watermelon/Turtl-d) |
| `underload` | [Underload](https://github.com/catseye/stringie) |
| `unefunge-97-mtfi` | [Unefunge-97 (MTFI)](https://github.com/TryItOnline/befunge-97-mtfi) |
| `unefunge-98-pyfunge` | [Unefunge-98 (PyFunge)](https://pythonhosted.org/PyFunge/) |
| `unicat` | [Unicat](https://github.com/gemdude46/unicat) |
| `unlambda` | [Unlambda](http://www.madore.org/~david/programs/unlambda/) |
| `uno` | [Uno](https://github.com/cairdcoinheringaahing/Uno-No) |
| `unreadable` | [Unreadable](https://esolangs.org/wiki/Unreadable) |
| `v` | [V (vim)](https://github.com/DJMcMayhem/V) |
| `v-fmota` | [V (FMota)](https://github.com/TryItOnline/v-fmota) |
| `var` | [VAR](https://github.com/machalvan/VAR/) |
| `verbosity` | [Verbosity](https://github.com/cairdcoinheringaahing/Verbosity) |
| `verbosity2` | [Verbosity v2](https://github.com/cairdcoinheringaahing/Verbosity-v2) |
| `versert` | [Versert](http://mearie.org/projects/versert/) |
| `vitsy` | [Vitsy](https://github.com/VTCAKAVSMoACE/Vitsy) |
| `waterfall` | [The Waterfall Model](https://esolangs.org/wiki/The_Waterfall_Model) |
| `whirl` | [Whirl](https://bigzaphod.github.io/Whirl/) |
| `whispers` | [Whispers v1](https://github.com/cairdcoinheringaahing/Whispers/tree/v1) |
| `whispers2` | [Whispers v2](https://github.com/cairdcoinheringaahing/Whispers) |
| `whitespace` | [Whitespace](https://web.archive.org/web/20150618184706/http://compsoc.dur.ac.uk/whitespace/tutorial.php) |
| `width` | [Width](https://github.com/stestoltz/Width) |
| `wierd` | [Wierd (John's)](https://github.com/catseye/Wierd) |
| `wise` | [Wise](https://github.com/Wheatwizard/Wise) |
| `woefully` | [Woefully](https://github.com/Destructible-Watermelon/Woefully) |
| `wsf` | [wsf](https://github.com/dkudriavtsev/wsf) |
| `wumpus` | [Wumpus](https://github.com/m-ender/wumpus) |
| `wyalhein` | [W.Y.A.L.H.E.I.N.](https://github.com/MilkyWay90/whenyouaccidentallylose100endorsementsinnationstates) |
| `xeec` | [xEec](http://paulo-jorente.de/poncho/esolang/xEec/) |
| `xeraph` | [xeraph](https://github.com/ConorOBrien-Foxx/xeraph) |
| `yaball` | [YABALL](https://github.com/TryItOnline/yaball) |
| `yup` | [yup](https://github.com/ConorOBrien-Foxx/yup) |
| `z80golf` | [Z80Golf](https://github.com/lynn/z80golf) |

</summary>
</details>

## Examples

<details>
<summary><b>Evaluating a string</b></summary>

Evaluating a string is really simple.

```js
// Evaluate a code (Node.js is the default language).
let response = await tio('console.log("Hello, World!");')

console.log(response)

// Evaluate a code from another programming language (e.g. Python).
response = await tio('print("Hello, World!")', 'python3')

console.log(response)
```

**Console output (for the first `console.log`):**

```js
{
  output: 'Hello, World!\n',
  language: 'javascript-node',
  timedOut: false,
  realTime: 0.069,
  userTime: 0.069,
  sysTime: 0.069,
  CPUshare: 99.99,
  exitCode: 0
}
```

</details>
<details>
<summary><b>Setting a default programming language</b></summary>

Set a default programming language so you don't have to repeat the same arguments all over again.

```js
tio.defaultLanguage = 'python3'

const response = await tio('print("Hello, World!")')

console.log(response)
```

</details>
<details>
<summary><b>Timeouts</b></summary>

Use this to contain scripts that runs longer than it should've been. **(e.g. infinite loop)**

```js
// Make the response time out after waiting for 10000 ms (10 seconds).
const response = await tio('for (;;);', 'javascript-node', 10000)

console.log(response)
```

**Console output:**

```js
{
  output: 'Request timed out after 10000ms',
  language: 'javascript-node',
  timedOut: true,
  realTime: 10,
  userTime: 10,
  sysTime: 10,
  CPUshare: 0,
  exitCode: 0
}
```

</details>
<details>
<summary><b>Setting a default timeout</b></summary>

Just like setting a default programming language beforehand, you can set default timeouts so you don't have to enter the same arguments again.

```js
tio.defaultTimeout = 10000

const response = await tio('for (;;);', 'javascript-node')

console.log(response) // Does the same as the example before.
```

</details>
