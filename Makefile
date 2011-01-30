PREFIX ?= /usr/local
BIN = bin/nodeler

install: install-nodeler

uninstall:
	rm -f $(PREFIX)/bin/nodeler

install-nodeler:
	install $(BIN) $(PREFIX)/bin
