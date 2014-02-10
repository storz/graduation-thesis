%
%
%
\ProvidesClass{UECIEresume}
  [2014/01/31 v0.1 for UEC Resume by shouno, wakisaka]
%  [2013/06/26 v0.0 for UEC Resume by shouno]
%
% modify the jsarticle 
%
\LoadClassWithOptions{jsarticle}
%
% page setting
%
% 
% title page setting 
% maketile parameter : title, author, date, affiliation, supervisor, studentid, headtitle
% 
\if@titlepage 
  \renewcommand\maketitle{
    \begin{titlepage}%
      \let\footnotesize\small 
      \let\footnoterule\relax
      \let \footnote \thanks 
      \null\vfil 
      \vskip 60\p@ 
      \begin{center}% 
        {{\LARGE \@title} \par}       % Title 
        \vskip 3em%
        {\large
          \lineskip .75em%
          \begin{tabular}[t]{c}% 
            \@author               % Author
          \end{tabular}\par}%
        \vskip 1.5em% 
        {\large \@date \par}%   　　% Set date in \large size.
      \end{center}\par
      \@thanks
      \vfil\null
    \end{titlepage}% 
    \setcounter{footnote}{0}%
    \global\let\thanks\relax
    \global\let\maketitle\relax 
    \global\let\@thanks\@empty
    \global\let\@author\@empty 
    \global\let\@date\@empty 
    \global\let\@title\@empty 
    \global\let\@correspondence\@empty% added for resume.cls 
    \global\let\@affiliation\@empty% added for resume.cls
    \global\let\@supervisor\@empty% added for resume.cls
    \global\let\@studentid\@empty% added for resume.cls
    \global\let\@headtitle\@empty% added for resume.cls
    \global\let\title\relax 
    \global\let\author\relax 
    \global\let\date\relax 
    \global\let\and\relax 
    \global\let\correspondence\relax%　 added for resume.cls
    \global\let\affiliation\relax%　 added for resume.cls
    \global\let\supervisor\relax%　 added for resume.cls
    \global\let\studentid\relax% added for resume.cls 
    \global\let\headtitle\relax% added for resume.cls 
  }

  }% added for resume.cls 
  \else 
    \renewcommand\maketitle{\par 
      \begingroup 
        \renewcommand\thefootnote{\@fnsymbol\c@footnote}% 
        \def\@makefnmark{\rlap{\@textsuperscript{\normalfont\@thefnmark}}}% 
        \long\def\@makefntext##1{\parindent 1em\noindent
          \hb@xt@1.8em{% 
            \hss\@textsuperscript{\normalfont\@thefnmark}}##1}% 
        \if@twocolumn
          \ifnum \col@number=\@ne
            \@maketitle 
          \else 
            \twocolumn[\@maketitle]% 
          \fi 
        \else
          \newpage
          \global\@topnum\z@ % Prevents figures from going at top of page.
          \@maketitle
        \fi 
        \markright{\@headtitle\hfill\@studentid}
        \thispagestyle{myheadings}\@thanks 
      \endgroup
      \setcounter{footnote}{0}% 
      \global\let\thanks\relax 
      \global\let\maketitle\relax 
      \global\let\@maketitle\relax
      \global\let\@thanks\@empty 
      \global\let\@author\@empty 
      \global\let\@date\@empty 
      \global\let\@title\@empty 
      \global\let\@correspondence\@empty% added for resume.cls
      \global\let\@affiliation\@empty% added for resume.cls
      \global\let\@supervisor\@empty% added for resume.cls
      \global\let\@studentid\@empty% added for resume.cls
      \global\let\@headtitle\@empty% added for resume.cls
      \global\let\title\relax 
      \global\let\author\relax
      \global\let\date\relax 
      \global\let\and\relax 
      \global\let\correspondence\relax% added for resume.cls 
      \global\let\affiliation\relax% added for resume.cls
      \global\let\supervisor\relax% added for resume.cls
      \global\let\studentid\relax% added for resume.cls
      \global\let\headtitle\relax% added for resume.cls
    }
    \def\@maketitle{\newpage 
      \null 
%      \vskip -2em
      \begin{center}
        {\Large {\bf{\@title}} \par} \vskip 1.5em 
        {\large \lineskip .5em 
          \begin{tabular}[t]{rl} 
            発表者: & \@affiliation \hskip 1.5zw 学籍番号\@studentid \hskip 1.5zw \@author \\
            指導教員: & \@supervisor \\
          \end{tabular} 
          \par} 
        \vskip 1em 
%        {\large \lineskip .5em
%          \begin{tabular}[t]{l}\@affiliation \end{tabular} \par
%        }
      \end{center} 
% \par 
%      \vskip 1.5em 
      \@ifundefined{@correspondence}{}
      { % \small 
%        \begin{center}
%          {\bf correspondence to \vspace{-.5em}\vspace{0pt}}
%        \end{center} 
%        \begin{quotation} \@correspondence \end{quotation} 
%        \vskip 1.5em 
        \gdef\@correspondence{}
        \gdef\@affiliation{}
      }
    } 
    \long\def\correspondence#1{\long\gdef\@correspondence{#1}} 
    \long\def\affiliation#1{\long\gdef\@affiliation{#1}}
    \long\def\supervisor#1{\long\gdef\@supervisor{#1}} 
    \long\def\studentid#1{\long\gdef\@studentid{#1}}
    \long\def\headtitle#1{\long\gdef\@headtitle{#1}}
\fi


% Definition for format  A4

%\setlength\columnsep{2zw}
\setlength\columnsep{5mm}
\setlength\columnseprule{0\p@}
\setlength\lineskip{1\p@}
\setlength\normallineskip{1\p@}
\setlength\lineskiplimit{1\p@}
\setlength\normallineskiplimit{1\p@}
\renewcommand{\baselinestretch}{}
\setlength\parskip{0\p@}
\setlength\parindent{1zw}
\@lowpenalty   51
\@medpenalty  151
\@highpenalty 301
\setlength\topskip{10\p@}
\setlength\headheight{2\topskip}
\setlength\footskip{0.03367\paperheight}
\ifdim\footskip<\baselineskip
  \setlength\footskip{\baselineskip}
\fi
\setlength\headsep{\footskip}
\addtolength\headsep{-\topskip}

\setlength\maxdepth{.5\topskip}
\newdimen\fullwidth
\setlength\fullwidth{0.86\paperwidth}
%\setlength\fullwidth{180mm}

\if@twocolumn \@tempdima=2zw \else \@tempdima=1zw \fi
\divide\fullwidth\@tempdima \multiply\fullwidth\@tempdima
\setlength\textwidth{\fullwidth}

\setlength{\textheight}{0.88\paperheight}
%\setlength{\textheight}{280mm}

\addtolength{\textheight}{-\topskip}
\addtolength{\textheight}{-\headsep}
\addtolength{\textheight}{-\footskip}
\addtolength{\textheight}{-\topskip}
\divide\textheight\baselineskip
\multiply\textheight\baselineskip
\addtolength{\textheight}{\topskip}
\addtolength{\textheight}{0.1\p@}
\setlength\marginparsep{\columnsep}
\setlength\marginparpush{\baselineskip}
\setlength{\oddsidemargin}{\paperwidth}
\addtolength{\oddsidemargin}{-\fullwidth}
\setlength{\oddsidemargin}{.5\oddsidemargin}
\iftombow
  \addtolength{\oddsidemargin}{-1in}
\else
  \addtolength{\oddsidemargin}{-\inv@mag in}
\fi
\setlength{\evensidemargin}{\oddsidemargin}
\if@mparswitch
  \addtolength{\evensidemargin}{\fullwidth}
  \addtolength{\evensidemargin}{-\textwidth}
\fi
\setlength\marginparwidth{\paperwidth}
\addtolength\marginparwidth{-\oddsidemargin}
\addtolength\marginparwidth{-\inv@mag in}
\addtolength\marginparwidth{-\textwidth}
\addtolength\marginparwidth{-1cm}
\addtolength\marginparwidth{-\marginparsep}
\@tempdima=1zw
\divide\marginparwidth\@tempdima
\multiply\marginparwidth\@tempdima
\setlength\topmargin{\paperheight}
\addtolength\topmargin{-\textheight}
\addtolength\topmargin{-\topskip}
\addtolength\topmargin{-\headsep}
\addtolength\topmargin{-\footskip}
%\setlength\topmargin{0.2\topmargin}
%\setlength\topmargin{0.2\topmargin}
\iftombow
  \addtolength\topmargin{-1in}
\else
  \addtolength\topmargin{-\inv@mag in}
\fi
{\footnotesize\global\setlength\footnotesep{\baselineskip}}
\setlength\footnotesep{0.7\footnotesep}
\setlength{\skip\footins}{16\p@ \@plus 5\p@ \@minus 2\p@}
\setcounter{topnumber}{9}
\renewcommand{\topfraction}{.85}
\setcounter{bottomnumber}{9}
\renewcommand{\bottomfraction}{.8}
\setcounter{totalnumber}{20}
\renewcommand{\textfraction}{.1}
\renewcommand{\floatpagefraction}{.8}
\setcounter{dbltopnumber}{9}
\renewcommand{\dbltopfraction}{.8}
\renewcommand{\dblfloatpagefraction}{.8}


\def\ps@myheadings{%
  \let\@oddfoot\@empty\let\@evenfoot\@empty
  \def\@evenhead{%
    \if@mparswitch \hss \fi%
    \hbox to \fullwidth{\leftmark}%
    \if@mparswitch\else \hss \fi}%
  \def\@oddhead{%
    \hbox to \fullwidth{\rightmark}\hss}%
  \let\@mkboth\@gobbletwo
  \let\sectionmark\@gobble
  \let\subsectionmark\@gobble
}

\pagestyle{empty}