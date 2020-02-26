import React from 'react';
import Terminal from "xterm";
import LocalEchoController from 'local-echo';
// import { FitAddon } from "xterm-addon-fit";
import { fit } from 'xterm/lib/addons/fit/fit';
import 'xterm/dist/xterm.css';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.xtermRef = React.createRef();
        this.term = new Terminal();
        // this.fitAddon = new FitAddon();
    }

    componentDidMount = () => {
        const { term } = this;
        term.open(this.xtermRef.current);
        // term.loadAddon(this.fitAddon);
        // this.fitAddon.fit();
        fit(term);
        const localEcho = new LocalEchoController(term);
        localEcho.addAutocompleteHandler((index) => {
            if (index !== 0) return [];
            return [ "bash", "ls", "ps", "cp", "chown", "chmod" ];
        });
        localEcho.addAutocompleteHandler((index) => {
            if (index === 0) return [];
            return [ "some-file", "another-file", ".git", ".gitignore" ];
        });
        this.localEcho = localEcho;
        this.readLine();
        // term.write('~$ ');
        // term.onKey(e => {
        //     const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
        //     const keyCode = e.domEvent.which;
        //
        //     if (keyCode === 13) {
        //         term.writeln('');
        //         term.write('$ ');
        //     } else if (keyCode === 8) {
        //         // Do not delete the prompt
        //         if (term._core.buffer.x > 2) {
        //             term.write('\b \b');
        //         }
        //     } else if (keyCode === 9) {
        //         console.log('Tab');
        //     }  else if (printable && keyCode > 31) {
        //         term.write(e.key);
        //     }
        // });
    };

    readLine = () => {
        this.localEcho.read("~$ ")
            .then(input => {
                console.log(input);
                this.readLine();
                // alert(`User entered: ${input}`);
            })
            .catch(error => alert(`Error reading: ${error}`));
    };

    render() {
        return (
            <div id="terminalContainer" ref={this.xtermRef}>
            </div>
        )
    }
}

export default MainContainer;
