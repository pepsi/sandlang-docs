import React, { Children } from 'react';
import './App.css';
// import 'materialize-css';
import 'react-materialize'
import { Row, Col, SideNav } from 'react-materialize';
// import {  } from 'react-router'
import { } from "react-router";
import { HashLink } from 'react-router-hash-link';
import { IntroSection } from './sections/IntroSection';
import { Section } from './components/Section';
import Highlight from 'react-highlight.js';


function MethodOverview(props) {
  return (<div><Highlight>
    {`${props.gloss}`}</Highlight>
    {props.children} </div>)
}
function App() {

  const IntroSection = <Section title="Intro" id="intro">
    <p>
      Sandlang is my first attempt at writing a language for the web.
      Sandlang compiles exclusively to WASM, with no plans to be ported to native.
      Support for binary WASM is soon planned

      </p>
  </Section>
  const TerminologySection = <Section title="Terminology" id="term">
    <p>
      Some of the terminology on this reference page might be a bit vague, So this section is needed to fully understand documentation.
    <br />
      <code>{`$[number]`}</code> means that it can be any of <code>i32 i64 f32 f64</code>.<br />
      Note: When referring to calling methods that have $[number] as an argument, typically both $[number]s need to be of the same type.
    </p>
  </Section>
  const SyntaxSection = <Section title="Syntax" id="syntax">
    <p>
      Syntax in sandlag is currently not planned that much, But I do know that I want it to work like a normal language like C or rust in its finished form.
      The current plan is to make a simple XML version, just to test everything out so I know that the frontend is compatabile with the backend.
      <Highlight className="xml">
        {`
<Module>
  <Function export=true result=i32 name="add" args = "left i32 right i32">
    <Add left="left" right="right"/>   
  </Function>
</Module>
        `}
      </Highlight>
      Will result in WAT similar to:
      <Highlight className="webassembly">
        {`(module
  (func $add (param $left i32) (param $right i32) (result i32)
    get_local $left
    get_local $right
    i32.add
    )
  )`}
      </Highlight>
          A Proper syntax will come later, but for now, I dont feel like its needed since im focusing more on the backend
    </p>

  </Section>
  const SlibSection = <Section title="ASLIB" id="aslib">
    <p>ASLIB (Abstract Sand LIB) is the abstract reference for the implementation of a standard library.<br />
    </p>
    {/* <Highlight>
      {`<Strout len=i32 address=i32>`}</Highlight>
    <p>
      Strout will print the next <code>len</code> chars at <code>address</code><br />
          Maybe in the future add support for fat pointers to call into this? Would be quite a bit cleaner than having to put the length. (asm vibes)
    </p> */}
    <MethodOverview gloss="<Strout len=i32 address=i32>">
      <p>
        Strout will print the next <code>len</code> chars at <code>address</code><br />
          Maybe in the future add support for fat pointers to call into this? Would be quite a bit cleaner than having to put the length. (asm vibes)
    </p>
    </MethodOverview>
    <hr/>
    <MethodOverview gloss="<Add left=[$Number] right=[$Number]">
      <p>
        Add left number to right number.
       Approximately <Highlight>
          get_local $left
          get_local $right
          num.add
         </Highlight>
      </p>
    </MethodOverview>
    <hr/>
    <MethodOverview gloss="<Sub left=[$Number] right=[$Number]">
    <p>
        Subtract right number from left number.
       Approximately <Highlight>
          get_local $left<br/>
          get_local $right<br/>
          num.add<br/>
         </Highlight>
      </p>

    </MethodOverview>
    <hr/>
    <MethodOverview gloss="<Mul left=[$Number] right=[$Number]">
    <p>
        Multiple left and right together.
       Approximately <Highlight>
          get_local $left<br/>
          get_local $right<br/>
          num.mul<br/>
         </Highlight>
      </p>

    </MethodOverview>
  </Section>

  const sections = [IntroSection, TerminologySection, SyntaxSection, SlibSection]

  let sectionlinks = []
  let sectionindex = 0;
  for (const section of sections) {
    console.log(section.props.title)
    sectionlinks.push(
      <li>
        <HashLink style={{
          "fontSize": "20px",
          "color": "#abb2bf"

        }} key={sectionindex} to={`/#${section.props.id}`}>{`${sectionindex}. ${section.props.title}`}</HashLink></li>)
    sectionindex++
  }
  return (
    <div className="App">
      <Row>
        <Col s={2}>

          <SideNav style={{
            "backgroundColor": "#333842",
          }} draggable={true}>
            <ul>
              {sectionlinks}
            </ul>
          </SideNav>
        </Col>
        <Col s={8}>
          {sections}
        </Col>
      </Row>

    </div>
  );
}

export default App;
