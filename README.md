# Proof Assistant

An online platform to enable Logic students to write, verify, and store [System L](https://en.wikipedia.org/wiki/System_L) style Natural Deduction proofs. Proofs are checked for correctness in real-time, and provides informative error messages. The project was developed as part of the [Logic4Fun](https://l4f.cecs.anu.edu.au/) initiative during [Logic Summer School](lss.cecs.anu.edu.au), 2015.

## TODO

* **Documentation**: The code-base has near to none documentation. This is uncharacteristic of me, but the circumstances were such that not spending time for documentation made sense. Now it does not (#7).
* **UX design**: Improve the usability of the interface.

  * Provide a legend to display short-keys for printing logical connectives (#15)
  * Have a dedicated top-level page explaining how-to used the site (#11).
* **Remove Login Wall**: I think needing to login discourages first time visitors from trying out the platform. Maybe there should be a landing page that just jumps right into the proof writing page.

## Software Stack
* Javascript
* Node.js
* MongoDB
* ANTLR4
* Bootstrap
* Jade

## Contributors

* [Suraj Narayanan Sasikumar](https://www.surajx.in)
* Boris Repasky

## Getting Started

### Setup an Account
Login/SignUp with any valid email. E-mail is just a placeholder for the username, essentially you can give a random valid email and password as long as you can remember it.

### Dashboard
The dashboard is where you create new proofs, and also where your existing proofs are listed along with there current status.

![Dashboard](/public/img/dashboard.png)
The `NEW PROOF` button brings up a pop-up dialogue where you can enter the [sequent](https://en.wikipedia.org/wiki/Sequent) you want to prove. Typing the sequent is very easy, the following short-keys auto-convert to their equivalent logical connectives as you type.
* \n:&nbsp;&nbsp;¬&nbsp;(<u><b>n</b></u>egation)
* \a:&nbsp;&nbsp;∧&nbsp;(<u><b>a</b></u>nd)
* \o:&nbsp;&nbsp;∨&nbsp;(<u><b>o</b></u>r)
* \i:&nbsp;&nbsp;→&nbsp;(<u><b>i</b></u>mplication)
* \e:&nbsp;&nbsp;⊢&nbsp;(<u><b>e</b></u>ntails)
* \t:&nbsp;&nbsp;⊤&nbsp;(<u><b>t</b></u>rue)
* \f:&nbsp;&nbsp;⊥&nbsp;(<u><b>f</b></u>alse)

Example: The sequent "¬(p → q) ⊢ p ∧ ¬q" should be typed as "\n(p \i q) \e p \a \nq". It may look daunting at first, but as you type, it'll becomes natural.

![New Proof](/public/img/create_new_proof.png)

### Proof Page
This is the page where you actually write the proof. All premises of the sequent is auto-populated for you as assumption lines.

![Proof Page](/public/img/proof_page.png)

The next proof line is entered using the fields provided at the bottom. The same short-keys mentioned earlier can be used to type in the connectives. Also, it is not necessary to press the `+` button every time, pressing the enter key on any of the input fields submits your  new proof line for validation. If you dont know what these fields are please read the excellent [introduction](http://users.cecs.anu.edu.au/~jks/LogicNotes/index.html) to Propositional Logic and System L style Natural Deduction proofs by Prof. John Slaney.

The platform also provides the ability to delete or edit rows, provided the change does not break the validity of the proof. When a proof line is deleted or edited the proof is <u>not</u> auto-saved on the server. You can see that the `SAVE` button would be now red in color, indicating an unsaved proof.

### Error Messages
Submission of the new proof line triggers validation of the entire proof. Only if the entire proof is valid, the new proof line is added. In case of an invalid proof line, a corresponding error message is displayed.

![Error Message](/public/img/error_message.png)

### Features
The proof is validated in-browser, i.e. the proof is not sent to the server each time a line is added. This allows fast verification of large proofs and also the ability to use the tool offline. If an internet connection is available, any change made to the proof is auto-saved on the server. The colour of the `SAVE` button indicates whether the proof was successfully saved on the server or not. A green `SAVE` button indicates that the latest proof is saved, while a red `SAVE` button indicates that there are some changes in the proof that are not saved in the server. Note that on each save request the proof is validated on the server-side as well.

When the line that completes the proof is entered, and the proof is validated, the status of the proof changes to `SUCCESS`.

![Success](/public/img/write_proof.png)

Enjoy Natural Deductions!
