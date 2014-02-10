SOURCE = resume
# LATEX = platex-sjis
LATEX = platex
# BIBTEX = bibtex
BIBTEX = bibtex
DVIPDFMX = dvipdfmx

all:
	$(LATEX) -halt-on-error $(SOURCE).tex | nkf -u
	$(BIBTEX) $(SOURCE) | nkf -u
	$(LATEX) -halt-on-error $(SOURCE).tex | nkf -u
	$(LATEX) -halt-on-error $(SOURCE).tex | nkf -u
	$(DVIPDFMX) $(SOURCE).dvi | nkf -u

pdf:
	$(DVIPDFMX) $(SOURCE).dvi

open:
	open $(SOURCE).pdf

clean:
	rm -f *~ $(SOURCE).dvi $(SOURCE).idx *.aux *.log *.lot *.lof *.toc *.bbl *.blg *.aux
