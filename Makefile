#!make

SRCDIR 		= src
DISTDIR 	= dist

NAME 			= emu-relay
SRCS			= *.ts
DIST 			= $(SRCS:%.ts=$(DISTDIR)/%.js)

build: $(DIST)

run: $(DIST)
	@node $(DISTDIR)/index.js

clean:
	@rimraf $(DISTDIR)
	
$(DISTDIR)/%.js: $(SRCDIR)/%.ts
	@echo "compiling..."
	@tsc
