import React from 'react'
import Helmet from 'react-helmet'
import { withFormik, Field } from 'formik'
import { isEmpty, trim, pick, keys } from 'lodash'

require('whatwg-fetch')

const FORM_NAME = 'reservation'
const FORM_STATUS__SUBMITTED = 'FORM_SUBMITTED'

const ERRORS__REQUIRED_FIELD = 'Dies ist ein Pflichtfeld'
const ERRORS__INVALID_FIELD = 'Die Eingabe ist ungültig'

const isEmptyValue = (value) => isEmpty(value) || isEmpty(trim(value))

const BIRTHDAY_REGEXP = /^\s*\d{2}\.\d{2}\.\d{4}\s*$/
const isValidBirthday = (birthday) => BIRTHDAY_REGEXP.test(String(birthday).toLowerCase())

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isValidEmail = (email) => EMAIL_REGEXP.test(String(email).toLowerCase())

const PHONE_REGEXP = /^[\+\(\)\-\.\d\s*]{8,}$/
const isValidPhone = (telefonnummer) => PHONE_REGEXP.test(trim(String(telefonnummer)).toLowerCase())

const FieldCheck = ({ touched, error }) => {
  if (!touched) return null
  if (isEmpty(error)) {
    return (
      <span className="icon is-small is-right">
        <i className="fa fa-check"/>
      </span>
    )
  } else {
    return (
      <span className="help is-danger">{error}</span>
    )
  }
}

const fieldClasses = (component, touched, error) =>
  component + (touched ? (error ? ' is-danger' : ' is-success') : '')

const encode = values =>
   Object.keys(values)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`)
      .join('&')


const ReservationForm = withFormik({
  mapPropsToValues: (props) => {
    return {
      name: '',
      stufe: 'Primarschule',
      jahr: '',
      beginn: 'Schuljahr',
      vornameDesKindes: '',
      geburtsdatum: '',
      geschlecht: 'weiblich',
      adresse: '',
      email: '',
      telefonnummer: '',
      bemerkungen: '',
    }
  },
  validate: (values, props) => {
    const errors = {}
    if (isEmptyValue(values.name)) {
      errors.name = ERRORS__REQUIRED_FIELD
    }
    if (isEmptyValue(values.jahr)) {
      errors.jahr = ERRORS__REQUIRED_FIELD
    }
    if (isEmptyValue(values.vornameDesKindes)) {
      errors.vornameDesKindes = ERRORS__REQUIRED_FIELD
    }
    if (isEmptyValue(values.geburtsdatum)) {
      errors.geburtsdatum = ERRORS__REQUIRED_FIELD
    } else if (!isValidBirthday(values.geburtsdatum)) {
      errors.geburtsdatum =
        'Das Format muss so sein: z.B. 01.11.2015'
    }
    if (isEmptyValue(values.adresse)) {
      errors.adresse = ERRORS__REQUIRED_FIELD
    }
    if (isEmptyValue(values.email)) {
      errors.email = ERRORS__REQUIRED_FIELD
    } else if (!isValidEmail(values.email)) {
      errors.email = ERRORS__INVALID_FIELD
    }
    if (isEmptyValue(values.telefonnummer)) {
      errors.telefonnummer = ERRORS__REQUIRED_FIELD
    } else if (!isValidPhone(values.telefonnummer)) {
      errors.telefonnummer = ERRORS__INVALID_FIELD
    }
    return errors
  },
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors,
      setStatus,
      setValues,
    }
  ) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': FORM_NAME, ...values })
    })
      .then(() => {
        setStatus(FORM_STATUS__SUBMITTED)
        setSubmitting(false)
      })
      .catch(error => {
        console.log(error)
        setErrors({ form: true })
        setSubmitting(false)
      })
  },
})(({
    values,
    errors,
    touched,
    status,
    isSubmitting,
    isValid, handleSubmit, }) =>
  status === FORM_STATUS__SUBMITTED ?
  <section>
    <h2 className="title is-size-3">Danke für Ihre Anfrage!</h2>
    <div className="content">
      <p>
      Wir werden mit Ihnen in Kürze Kontakt aufnehmen, um das weitere Vorgehen zu besprechen.
      </p>
    </div>
  </section>
  :
  <section
    style={{
      opacity: isSubmitting ? 0.5 : 1,
      pointerEvents: isSubmitting ? 'none' : undefined,
    }}
  >
    <h2 className="title is-size-3">Platzreservation</h2>
    <div className="content">
    <form
      onSubmit={handleSubmit}
      id="reservationForm"
      className="form"
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-trap"
    >
    <p>
    Mit diesem Formular haben Sie die Möglichkeit, einen Kindergarten- oder Primarschulplatz in der
    FREIEN SCHULE Bergmeilen zu reservieren. Um gegenseitige Erwartungen zu klären führen wir
    Schnuppertage und vor der definitiven Anmeldung ein Elterngespräch durch.
    </p>

    <input type="hidden" name="form-name" value="reservation" />
    <p style={{ display: 'none' }}>
      <label>
        Don’t fill this out if you're human: <Field name="bot-trap" />
      </label>
    </p>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Von</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control is-expanded has-icons-left has-icons-right">
            <Field
              className={fieldClasses('input', touched.name, errors.name)}
              name="name" type="text" placeholder="Ihr Name"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user"/>
            </span>
            <FieldCheck touched={touched.name} error={errors.name} />
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
              <span className="select">
                <Field
                  component="select"
                  name="stufe"
                  className="select"
                >
                  <option value="Primarschule">der Primarschule</option>
                  <option value="Kindergarten">im Kindergarten</option>
                </Field>
              </span>
          </p>
          <p className="control has-icons-right">
            <Field
              className={fieldClasses('input', touched.jahr, errors.jahr)}
              type="text" name="jahr" placeholder="Klasse/Jahr"
            />
            <FieldCheck touched={touched.jahr} error={errors.jahr} />
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
              <span className="select">
                <Field component="select" className="select" name="beginn" >
                  <option value="Schuljahr">dem neuen Schuljahr</option>
                  <option value="Bald">möglichst bald</option>
                </Field>
              </span>
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
            <Field
              className={fieldClasses('input', touched.vornameDesKindes, errors.vornameDesKindes)}
              type="text" name="vornameDesKindes"
              placeholder="Vorname des Kindes"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-child"/>
            </span>
            <FieldCheck touched={touched.vornameDesKindes} error={errors.vornameDesKindes} />
          </p>
          <p className="control">
              <span className="select">
                <Field
                  component="select"
                  className="select"
                  name="geschlecht"
                >
                  <option>weiblich</option>
                  <option>männlich</option>
                </Field>
              </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <Field
              className={fieldClasses('input', touched.geburtsdatum, errors.geburtsdatum)}
              type="text" name="geburtsdatum"
              placeholder="Geburtsdatum, z.B. 01.11.2015"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-calendar"/>
            </span>
            <FieldCheck touched={touched.geburtsdatum} error={errors.geburtsdatum} />
          </p>
        </div>
      </div>
    </div>


    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Ihre Kontaktdaten</label>
      </div>
      <div className="field-body">
        <div className="control is-expanded has-icons-right">
          <Field
            component="textarea"
            className={fieldClasses('textarea', touched.adresse, errors.adresse)}
            name="adresse"
            placeholder="Ihre Adresse"
            rows={3} cols={30}
          />
          <FieldCheck touched={touched.adresse} error={errors.adresse} />
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
            <Field
              type="email" placeholder="E-Mail"
              className={fieldClasses('input', touched.email, errors.email)}
              name="email"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"/>
            </span>
            <FieldCheck touched={touched.email} error={errors.email} />
          </p>
        </div>
        <div className="field is-expanded">
          <p className="control is-expanded has-icons-left has-icons-right">
            <Field
              name="telefonnummer" placeholder="Telefonnummer"
              className={fieldClasses('input', touched.telefonnummer, errors.telefonnummer)}
              type="tel"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-telefonnummer"/>
            </span>
            <FieldCheck touched={touched.telefonnummer} error={errors.telefonnummer} />
          </p>
        </div>
      </div>
    </div>





    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Bemerkungen</label>
      </div>
      <div className="field-body">
        <div className="field">
            <Field
              component="textarea"
              className="textarea" name="bemerkungen" placeholder="Bemerkungen/Fragen"
            />
        </div>
      </div>
    </div>



    <div className="content">

      <p>
        Die Reservation ist kostenlos und für beide Seiten unverbindlich. Eine Schnupperwoche wird unabhängig von einem
        Vertragsabschluss mit Fr. 500.- pro Familie verrechnet. Ein Anmeldegespräch wird sofern kein
        Vertragsabschluss zustande kommt mit Fr. 80.- verrechnet. Bei Vertragsabschluss ist das
        Anmeldegespräch kostenlos.
      </p>

      <p>
        Nach Erhalt des Reservationsformulars nehmen wir mit Ihnen Kontakt auf, um das weitere Vorgehen
        zu besprechen.
      </p>

    </div>

    {/*<div className="field">*/}
      {/*<p className="control">*/}
        {/*<div data-netlify-recaptcha="true"></div>*/}
      {/*</p>*/}
    {/*</div>*/}

    {errors.form &&
    <div className="notification is-danger">
      <p>
      Oops... Sorry, die Anfrage konnte aus einem technischen Grund
      leider nicht verschickt werden.
      </p>
      <p>
        Versuchen Sie bitte nochmals. Sonst können Sie uns die Anfrage auch per E-Mail
        auf <a href="mailto:info@freie-schule-bergmeilen.ch">info@freie-schule-bergmeilen.ch</a> schicken.
      </p>
    </div>
    }

    {!isEmpty(pick(errors, keys(touched))) &&
    <div className="notification is-danger">
      Sie haben das Formular noch nicht korrekt oder vollständig ausgefüllt.
    </div>
    }

    <div className="field is-grouped is-grouped-right">
      <p className="control">
        <button
          className="button is-primary is-large" type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting &&
            <div className="loader" style={{ position: 'absolute' }}/>
          }
          <div style={{ opacity: isSubmitting ? 0.1 : 1 }}>Anfrage abschicken</div>
        </button>
      </p>
    </div>
  </form>
  </div>
</section>
)

export default () =>
  <section className="section">
    <Helmet>
      <title>Platzreservation</title>
    </Helmet>

    <ReservationForm />

  </section>

