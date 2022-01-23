\ProvidesClass{thesis}[]
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{report}}

\ProcessOptions
\LoadClass[10pt,a4paper]{report}

\usepackage{iftex}

\ifPDFTeX
  \usepackage{fbb}
  \usepackage{FiraMono}
  \usepackage{FiraSans}
  \usepackage{textcomp}
  \usepackage[english]{babel}
  \usepackage[T1]{fontenc}
\else
  \usepackage{fontspec}
  \usepackage{polyglossia}
  \setromanfont[Path=./fonts/, BoldFont=fbb-Bold, UprightFont=fbb-Regular, ItalicFont=fbb-Italic, BoldItalicFont=fbb-BoldItalic]{fbb}
  \setmonofont[Path=./fonts/, BoldFont=FiraMono-Bold, UprightFont=FiraMono-Regular]{FiraMono.ttf}
  \setsansfont[Path=./fonts/, BoldFont=FiraSans-Bold, UprightFont=FiraSans-Regular, ItalicFont=FiraSans-Italic, BoldItalicFont=FiraSans-BoldItalic]{FiraSans.ttf}
\fi

\usepackage[libertine,bigdelims,vvarbb]{newtxmath}
\usepackage[cal=boondoxo]{mathalfa}

\usepackage{microtype}
\usepackage{anyfontsize}
\let\Bbbk\relax
\usepackage{amsmath,amsfonts,amsbsy,amssymb}
\usepackage[style]{abstract}

\usepackage{etoolbox}
\usepackage[compact]{titlesec}
\usepackage{color}
\usepackage[table,svgnames]{xcolor}
\usepackage{parskip}
\usepackage{listings}

\usepackage[titles]{tocloft} 
\renewcommand{\cftdot}{}
\renewcommand\cftsecafterpnum{\vskip 3pt}
\renewcommand\cftbeforechapskip{5pt}
\renewcommand\cftsubsecafterpnum{\vskip 1.5pt}
\renewcommand\cftchapafterpnum{\vskip 4pt}
\usepackage[nottoc]{tocbibind}

\definecolor{bluekeywords}{rgb}{0.13, 0.19, 0.7}
\definecolor{greencomments}{rgb}{0.1, 0.5, 0.2}
\definecolor{redstrings}{rgb}{0.8, 0.15, 0.1}
\definecolor{graynumbers}{rgb}{0.5, 0.5, 0.5}
\definecolor{subtlegray}{rgb}{0.98, 0.98, 0.98}
\usepackage{lstautogobble}
\usepackage{listings}
\lstset{
    autogobble,    
    columns=fullflexible,
    showspaces=false,
    showtabs=false,
    breaklines=true,
    showstringspaces=false,
    breakatwhitespace=true,
    escapeinside={(*@}{@*)},
    rulecolor=\color{lightgray},
    backgroundcolor=\color{subtlegray},
    commentstyle=\color{greencomments},
    keywordstyle=\color{bluekeywords},
    stringstyle=\color{redstrings},
    numberstyle=\color{graynumbers},
    basicstyle=\ttfamily\linespread{1.15}\footnotesize,
    frame=tb,
    framesep=12pt,
    framexleftmargin=12pt,
    tabsize=4,
    captionpos=b
}

\usepackage{numprint}
\usepackage{graphicx}
\usepackage[hidelinks]{hyperref}

\usepackage[format=plain,
labelfont={bf,it},
textfont=it,tableposition=above]{caption}

\newcommand{\secfont}{\normalfont\sffamily}

\renewcommand{\abstractnamefont}{\Large\secfont}
\renewcommand{\abstitlestyle}[1]{{{\let\clearpage\relax \chapter*{#1}}}}

\usepackage[toc]{appendix}

\usepackage{subcaption}

\usepackage[top=3cm,bottom=3cm,left=3cm,right=3cm]{geometry}
\setlength{\parskip}{5pt plus 2pt}

\renewcommand\maketitle{
  \begin{titlepage}%
      \definecolor{UniBlue}{HTML}{00355F}
        
      \let\footnotesize\small
      \let\footnoterule\relax
      \let\footnote \thanks

      \vspace{0in}
      \includegraphics[width=\linewidth]{images/University-of-Glasgow-1024x374.png}
      \vskip 0em
      \color{UniBlue}
      \begin{center}
          {\large MSc Data Analytics}\\
      \end{center}

      \vspace{2cm}
        \Large
        \vskip 8em
        \begin{center}
          \color{UniBlue}
            \noindent
            {\Huge \scshape  \@title \par}
            \vfill
            {\Large
            \textbf{\@author}\\
            \@date}
        \end{center}

  \end{titlepage}

  \setcounter{footnote}{0}
  \global\let\thanks\relax
  \global\let\maketitle\relax
  \global\let\@thanks\@empty
  \global\let\@author\@empty
  \global\let\@date\@empty
  \global\let\@consentname\@empty
  \global\let\@consentdate\@empty

  \global\let\@title\@empty
  \global\let\title\relax
  \global\let\author\relax
  \global\let\date\relax
  \global\let\and\relax
}
\usepackage{booktabs}

\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhead{}
\fancyfoot{}
\fancyhead[R]{\thepage}
\renewcommand{\headrulewidth}{0pt}
\fancypagestyle{plain}{
    \renewcommand{\headrulewidth}{0pt}
    \fancyhf{}
    \fancyhead[R]{\thepage}
}

\usepackage{titlesec}

\usepackage{xstring}
\titleformat{\chapter}[display]
  {\normalfont}{}{0pt}{
    \huge\bfseries\secfont
    \IfInteger{\thechapter}{\ifnum0=0\thechapter\relax\else\relax {\Huge \thechapter}\ \rule[-0.25em]{0.5pt}{1.5em}\ \fi}
    {\thechapter \ \rule[-0.25em]{0.5pt}{1.5em}\ }}
  \titlespacing*{\chapter}      
  {0pt}{0pt}{15pt}  

\titleformat{name=\chapter,numberless}
            [display]
            {\normalfont\huge\bfseries\secfont}
            {}
            {0pt}
            {}

\usepackage{tcolorbox}
\newenvironment{highlight}
{\begin{tcolorbox}[notitle,boxrule=0pt,colback=green!10,colframe=green!10]}
{
\end{tcolorbox}
}

\newenvironment{highlight_title}[1]
{\begin{tcolorbox}[title=#1,boxrule=2pt,colback=green!10,colframe=green!20,coltitle=black,fonttitle=\bfseries]}
{
\end{tcolorbox}
}

\setlength{\parindent}{0pt}

\captionsetup{subrefformat=parens}

\usepackage[plain, noline, shortend, linesnumberedhidden]{algorithm2e}
\SetAlFnt{\sffamily \small}

\titlespacing{\section}{10pt}{1.5\baselineskip}{8pt plus 3pt minus 3pt}
\titlespacing{\subsection}{10pt}{\baselineskip}{8pt plus 4pt minus 1pt}
\titleformat{\subsubsection}[runin]{\bfseries }{}{}{}[]
\titlespacing{\chapter}{0pt}{0pt}{40pt plus 10pt minus 5pt} 

\pagenumbering{roman}

\renewcommand{\@listI}{
      \leftmargin=25pt
      \rightmargin=0pt
      \labelsep=5pt
      \labelwidth=20pt
      \itemindent=0pt
      \listparindent=0pt
      \topsep=0pt plus 2pt minus 4pt
      \partopsep=0pt plus 1pt minus 1pt
      \parsep=1pt plus 1pt
      \itemsep=\parsep}

\usepackage{soul}
\newcommand{\todo}[1]{\large \hl{TODO: #1}\PackageWarning{TODO:}{#1!}}

\renewcommand{\UrlFont}{\ttfamily\small}

\usepackage{siunitx}
