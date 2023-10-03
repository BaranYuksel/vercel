export default function Contact() {
  return (
    <div>
      <h1>Kontaktformular</h1>
      <form action="/api/send" method="post">
        <div>
          <label htmlFor="name">Navn:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="phone">Telefonnummer:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div>
          <label htmlFor="cvr">CVR Nummer:</label>
          <input type="text" id="cvr" name="cvr" required />
        </div>

        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
