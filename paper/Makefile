SOURCE = thesis
# LATEX = platex-sjis
LATEX = platex
BIBTEX = bibtex
DVIPDFMX = dvipdfmx

all:
	$(LATEX) $(SOURCE).tex
	$(BIBTEX) main
	$(LATEX) $(SOURCE).tex
	$(LATEX) $(SOURCE).tex
	$(DVIPDFMX) $(SOURCE).dvi

pdf:
	$(DVIPDFMX) $(SOURCE).dvi

open:
	open $(SOURCE).pdf

clean:
	rm -f *~ $(SOURCE).dvi $(SOURCE).aux $(SOURCE).log *.lot *.lof
