import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dataMatchAll } from "./data";

export default function Hasil() {
  const [result, setResult] = useState<string>("Tidak ada uji hipotesis yang sesuai");
  const [resultFound, setResultFound] = useState<boolean>(false);
  useEffect(() => {
    const finalAnswers = localStorage.getItem("uji-hipotesis-finalAnswers");
    console.log("FINAL ANSWERS:", finalAnswers)
    Object.keys(dataMatchAll).map((match) => {
      if (JSON.stringify(dataMatchAll[match].answer) === finalAnswers) {
        
        console.log("HELLO:", finalAnswers)
        console.log("HELL1:", JSON.stringify(dataMatchAll[match].answer))
        setResult(JSON.stringify(dataMatchAll[match].uji))
        setResultFound(true)
      } else {
        // console.log("dataMatchAll[match].uji", JSON.stringify(dataMatchAll[match].answer));
        // setResult("NO MAATCH")
        
      }
      return null;
    });
  }, []);

  function determineUjiHipotesis() {
    Object.keys(dataMatchAll).map((match) => {
      if (
        JSON.stringify(dataMatchAll[match].answer) === JSON.stringify(answers)
      ) {
        setResult(JSON.stringify(dataMatchAll[match].uji));
        console.log(dataMatchAll[match].uji);
      } else {
        console.log("dataMatchAll[match].uji", dataMatchAll[match].uji);
        // console.log(JSON.stringify(dataMatchAll[match].answer));
        // console.log(JSON.stringify(answers));
      }
      return null;
    });

  }

  return (
    <>
      <Head>
        <title>Uji Hipotesis | Risetku.com</title>
      </Head>
      <div className="uji-hipotesis__container">
        <div className="text-center">
          <h2>{result}</h2>

          <div className="button-small__container">
            <Link href="/uji-hipotesis/mulai">
              <a className="m-1">
                Selesai
              </a>
            </Link>

            <Link href="/uji-hipotesis/mulai">
              <a className="m-1">
                Coba Lagi
              </a>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
