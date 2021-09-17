import mercadopago from 'mercadopago'

export const IndexPayment = () => {
  const mp = mercadopago.configurations.setAccessToken(
    'TEST-6377661634122068-091722-c7a11dd00da61f2ffc5e6ba6daa8fbd8-237361147'
  )

  return (
    <>
      <form id="form-checkout">
        <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
        <input
          type="text"
          name="cardExpirationMonth"
          id="form-checkout__cardExpirationMonth"
        />
        <input
          type="text"
          name="cardExpirationYear"
          id="form-checkout__cardExpirationYear"
        />
        <input
          type="text"
          name="cardholderName"
          id="form-checkout__cardholderName"
        />
        <input
          type="email"
          name="cardholderEmail"
          id="form-checkout__cardholderEmail"
        />
        <input
          type="text"
          name="securityCode"
          id="form-checkout__securityCode"
        />
        <select name="issuer" id="form-checkout__issuer"></select>
        <select
          name="identificationType"
          id="form-checkout__identificationType"
        ></select>
        <input
          type="text"
          name="identificationNumber"
          id="form-checkout__identificationNumber"
        />
        <select name="installments" id="form-checkout__installments"></select>
        <button type="submit" id="form-checkout__submit">
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Carregando...
        </progress>
      </form>
    </>
  )
}

export default IndexPayment
