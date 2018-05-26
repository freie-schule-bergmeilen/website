import React from 'react'
import Helmet from 'react-helmet'

export default () =>
  <section className="section">
    <Helmet>
      <title>Platzreservation</title>
    </Helmet>
    <h2 className="title is-size-3">Platzreservation</h2>
    <div className="content">

      <p>
      Mit diesem Formular haben Sie die Möglichkeit, einen Kindergarten- oder Primarschulplatz in der
      FREIEN SCHULE Bergmeilen zu reservieren. Um gegenseitige Erwartungen zu klären führen wir
      Schnuppertage und vor der definitiven Anmeldung ein Elterngespräch durch.
      </p>
    </div>


    <form
      className="form"
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="Platzreservation" />


      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Von</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded has-icons-left">
              <input className="input" type="text" placeholder="Ihr Name"/>
              <span className="icon is-small is-left">
                <i className="fa fa-user"/>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Einen Platz in</label>
        </div>
        <div className="field-body">
          <div className="field has-addons">
            <p className="control">
              <div className="select">
                <select className="select" name="stufe" >
                  <option>der Primarschule</option>
                  <option>im Kindergarten</option>
                </select>
              </div>
            </p>
            <p className="control has-icons-right">
              <input className="input" type="text" name="year" placeholder="Jahr/Klasse"/>
            </p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Ab</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <div className="select">
                <select className="select" name="start" >
                  <option>dem neuen Schuljahr</option>
                  <option>möglichst bald</option>
                </select>
              </div>
            </p>
          </div>
        </div>
      </div>


      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Ihr Kind</label>
        </div>
        <div className="field-body">

          <div className="field has-addons">
            <p className="control has-icons-left has-icons-right">
              <input className="input" type="text" name="childName"
                     placeholder="Vorname des Kindes"/>
              <span className="icon is-small is-left">
                <i className="fa fa-child"/>
              </span>
            </p>
            <p className="control">
              <span className="select">
                <select className="select" name="role[]" >
                  <option>Mädchen</option>
                  <option>Bub</option>
                </select>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input className="input" type="text" name="childBirthday"
                     placeholder="Geburtsdatum, z.B. 01.11.2015"/>
              <span className="icon is-small is-left">
                <i className="fa fa-calendar"/>
              </span>
            </p>
          </div>
        </div>
      </div>


      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Ihre Kontaktdaten</label>
        </div>
        <div className="field-body">
          <div className="field">
            <textarea
              className="textarea" name="address" placeholder="Ihre Adresse"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label"/>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded has-icons-left has-icons-right">
              <input className="input" type="email" placeholder="E-Mail" value="" />
              {/*is-success*/}
              <span className="icon is-small is-left">
                  <i className="fa fa-envelope"/>
                </span>
              {/*<span className="icon is-small is-right">*/}
              {/*<i className="fa fa-check"/>*/}
              {/*</span>*/}
            </p>
          </div>
          <div className="field is-expanded">
            <div className="field has-addons">
              <p className="control">
                <a className="button is-static">
                  +41
                </a>
              </p>
              <p className="control is-expanded">
                <input className="input" type="tel" placeholder="Telefonnummer" />
              </p>
            </div>
          </div>
        </div>
      </div>





      {/*<div className="field is-horizontal">*/}
        {/*<div className="field-label is-normal">*/}
          {/*<label className="label">Geschwister</label>*/}
        {/*</div>*/}
        {/*<div className="field-body">*/}
          {/*<div className="field">*/}
            {/*<textarea*/}
              {/*className="textarea" name="siblings"*/}
              {/*placeholder="Namen und Geburtsdaten von Geschwistern"*/}
              {/*rows={2}*/}
            {/*/>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</div>*/}


      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Bemerkungen</label>
        </div>
        <div className="field-body">
          <div className="field">
            <textarea
              className="textarea" name="remarks" placeholder="Bemerkungen/Fragen"
            />
          </div>
        </div>
      </div>


      {/*<div className="field is-horizontal">*/}
          {/*<div className="field-label is-normal">*/}
            {/*<label className="label">Adresse</label>*/}
          {/*</div>*/}
          {/*<div className="field-body">*/}
            {/*<div className="field">*/}
              {/*<div className="control">*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}





        {/*<div className="field is-horizontal">*/}
          {/*<div className="field-label is-normal">*/}
            {/*<label className="label">Familienname</label>*/}
          {/*</div>*/}
          {/*<div className="field-body">*/}
            {/*<p className="control is-expanded has-icons-left">*/}
              {/*<input className="input" type="text" placeholder="Name"/>*/}
              {/*<span className="icon is-small is-left">*/}
              {/*<i className="fa fa-user"></i>*/}
            {/*</span>*/}
            {/*</p>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="field">*/}
          {/*<label className="label">Adresse</label>*/}
          {/*<textarea className="textarea" name="address"></textarea>*/}
        {/*</div>*/}
        {/*<div className="field">*/}
          {/*<label className="label">E-Mail</label>*/}
          {/*<input className="input" type="email" name="name" />*/}
        {/*</div>*/}
        {/*<div className="field">*/}
          {/*<label className="label">Bemerkungen/Fragen:</label>*/}
          {/*<textarea className="textarea" name="remarks"></textarea>*/}
        {/*</div>*/}

      <div className="content">

        <p>
        Die Reservation ist kostenlos und unverbindlich. Eine Schnupperwoche wird unabhängig von einem
        Vertragsabschluss mit Fr. 500.- pro Familie verrechnet. Ein Anmeldegespräch wird sofern kein
        Vertragsabschluss zustande kommt mit Fr. 80.- verrechnet. Bei Vertragsabschluss ist das
        Anmeldegespräch kostenlos.
        </p>

        <p>
        Nach Erhalt des Reservationsformulars nehmen wir mit Ihnen Kontakt auf, um das weitere Vorgehen
        zu besprechen.
        </p>

      </div>

      <div className="field">
        <p className="control">
          <button className="button is-primary is-large" type="submit">Anfrage abschicken</button>
        </p>
      </div>
    </form>

  </section>

