"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
// Extender la interfaz Window para incluir wpwlOptions
declare global {
  interface Window {
    wpwlOptions?: {
      maskCvv: boolean;
      locale: string;
      requireCvv: boolean;
      registrations: { requireCvv: boolean };
      allowEmptyCvv: boolean;
      onReady?: () => void;
    };
  }
}

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const ID = searchParams.get("ID");
  const formulario = searchParams.get("base64");
  const bookclassinfos = searchParams.get("bookclassinfos");

  const [loading, setLoading] = useState(true);
  const [telefonoError, setTelefonoError] = useState("");

  useEffect(() => {
    if (ID) {
      setLoading(false);
    }
  }, [ID]);

  useEffect(() => {
    const loadPaymentWidgets = async () => {
      // Verifica que ID esté definido y no sea null
      if (!ID) {
        console.error("ID no definido o nulo.");
        return;
      }

      // Cargar el script de paymentWidgets.js
      const script = document.createElement("script");
      script.src = `https://${process.env.NEXT_PUBLIC_URL_PAYMENT}/v1/paymentWidgets.js?checkoutId=${ID}`;
      script.async = true;
      script.onload = () => {
        initializePaymentWidgets();
      };
      document.body.appendChild(script);
    };

    const initializePaymentWidgets = () => {
      window.wpwlOptions = {
        maskCvv: true,
        locale: "es",
        requireCvv: true,
        registrations: { requireCvv: true },
        allowEmptyCvv: false,
        onReady: function () {
          const createRegistrationHtml =
            '<div id="customer.email" class="customInput">Email: <input type="text" class="wpwl-control" name="customer.email" value=""></div>' +
            '<div id="customer.phone" class="customInput">Teléfono ej.(52-6641501234): <input type="text" class="wpwl-control" id="telefono" name="customer.phone" maxlength="15" value="52-"></div>' +
            '<div id="billing.street1" class="customInput">Dirección: <input type="text" class="wpwl-control" name="billing.street1" value="" maxlength="48"></div>' +
            '<div id="billing.postcode" class="customInput">Código Postal: <input type="text" class="wpwl-control" name="billing.postcode" value="" maxlength="9"></div>' +
            '<div id="billing.city" class="customInput">Cuidad: <input type="text" class="wpwl-control" name="billing.city" value="" maxlength="20"></div>';

          // Encontrar el formulario de manera segura
          const form = document.querySelector("form.wpwl-form-card");
          if (!form) {
            console.error("Formulario no encontrado.");
            return;
          }

          // Encontrar el botón de manera segura dentro del formulario
          const button = form.querySelector(".wpwl-button");
          button?.addEventListener("click", async function (e) {
            console.log("====================================");
            console.log("clicked");
            console.log("====================================");
            type InfoArray = [
              string,
              string,
              string,
              string,
              string,
              string,
              string
            ];

            // Then, use optional chaining and nullish coalescing
            const infos: InfoArray | undefined = bookclassinfos?.split(
              "%26"
            ) as InfoArray | undefined;

            if (infos && infos.length >= 7) {
              const totalprice = infos[0];
              const name = `${infos[1]} ${infos[2]}`;
              const email = infos[3].replaceAll("%40", "@");
              const date = decodeURIComponent(infos[4]);
              const classNum = parseInt(infos[5]);
              const seatsList = infos[6].replaceAll("%2C", ",");
              console.log("====================================");
              console.log(totalprice);
              console.log(name);
              console.log(email);
              console.log(date);
              console.log(classNum);
              console.log(seatsList);
              console.log("====================================");
              const classList = [
                "7:00 - 8:00 AM",
                "8:00 - 9:00 AM",
                "9:00 - 10:00 AM",
                "10:00 - 11:00 AM",
                "5:00 - 6:00 PM",
                "6:00 - 7:00 PM",
                "7:00 - 8:00 PM",
                "8:00 - 9:00 PM",
              ];
              const classnumber = classList[classNum];
              console.log("====================================");
              console.log(classnumber);
              console.log("====================================");
              try {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_MAILER_SERVER}/api/user/mailer`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                      to: email,
                      date: date,
                      classNum: classList[classNum],
                      seatsList: seatsList,
                      // txt: `Dear ${name},\n\nYour booking for ${date} has been confirmed. Thank you for choosing our service.\n\nBest regards,\nYour Company`,
                    }),
                  }
                );

                if (response.ok) {
                  alert("Email sent successfully!");
                } else {
                  throw new Error("Failed to send email");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("Failed to send email. Please try again.");
              }
            }
          });
          if (!button) {
            console.error("Botón no encontrado dentro del formulario.");
            return;
          }

          // Crear elementos HTML a partir de createRegistrationHtml
          const wrapper = document.createElement("div");
          wrapper.innerHTML = createRegistrationHtml;
          const elements = Array.from(wrapper.children);

          // Insertar los elementos antes del botón
          elements.forEach((element) => {
            button.parentNode?.insertBefore(element, button);
          });

          // Aplicar formato al campo de teléfono después de insertarlo en el DOM
          const telefonoInput = document.getElementById("telefono");
          const submitButton = document.querySelector(".wpwl-button");
          if (telefonoInput) {
            telefonoInput.addEventListener("input", function (e) {
              const target = e.target as HTMLInputElement; // Aserción de tipo
              let value = target.value.replace(/[^0-9]/g, ""); // Elimina todos los caracteres que no sean números
              if (value.length > 2) {
                value = value.substring(0, 2) + "-" + value.substring(2);
              }
              target.value = value;
              if (value.length < 12) {
                if (submitButton) {
                  submitButton.setAttribute("disabled", "true");
                  submitButton.classList.add("disabled");
                }

                setTelefonoError(
                  "Por favor ingresa un número completo de teléfono (mínimo 11 dígitos)."
                );
              } else {
                if (submitButton) {
                  submitButton.removeAttribute("disabled");
                  submitButton.classList.remove("disabled"); //
                }

                setTelefonoError("");
              }
            });
          }
        },
      };

      // Asegurarse de que el script wpwlOptions se ejecute
      if (
        window.wpwlOptions &&
        typeof window.wpwlOptions.onReady === "function"
      ) {
        window.wpwlOptions.onReady();
      }
    };

    if (ID) {
      loadPaymentWidgets();
    }
  }, [ID]);

  if (loading) {
    return (
      <section className="w-full bg-white flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white relative">
        <div className="w-full min-h-screen flex flex-col justify-around items-center gap-5 pt-24 content-center">
          <form
            action={`${process.env.NEXT_PUBLIC_APP_URL}/statusPayment?base64=${formulario}`}
            className="paymentWidgets wpwl-form-card"
            data-brands="VISA MASTER AMEX"
          ></form>
          {telefonoError && <p style={{ color: "red" }}>{telefonoError}</p>}
        </div>
      </section>
      <div>
        <h1>Payment Page</h1>
        {ID && (
          <Script
            src={`https://${process.env.NEXT_PUBLIC_URL_PAYMENT}/v1/paymentWidgets.js?checkoutId=${ID}`}
          />
        )}
      </div>
    </>
  );
};

const Home = () => (
  <Suspense
    fallback={
      <section className="w-full bg-white flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </section>
    }
  >
    <PaymentStatus />
  </Suspense>
);

export default Home;
