// import modul yang dibutuhkan dari react
import React, { useRef, useState } from "react";

function App() {
  // create initial state
  const [plaintText, setPlainText] = useState(null);
  const [cipherText, setCipherText] = useState(null);

  // create initial ref
  const refPlainText = useRef();
  const refCipherText = useRef();

  const encryptROT13 = (value) => {
    // Convert value : fungsinya buat membuat kata menjadi huruf kapital
    var convertUpperCase = value.toUpperCase();
    // Split value : fungsinya buat memisahkan kumpulan kata menjadi beberapa index array terpisah
    var splitValueSpace = convertUpperCase.split(" ");

    // Split alphabet : fungsinya buat memisahkan kumpulan alphabet menjadi array.
    var alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
    var splitAlphabet = alphabet.split(" ");

    // variabel arraya untuk menampung hasil cipher atau plaintext
    var dummyCipher = [];

    // melakukan perulangan pada value
    for (let index = 0; index < splitValueSpace.length; index++) {
      // fungsinya untuk memecah beberapa kata menjadi susunan huruf berbentuk array
      const charSpace = splitValueSpace[index].split("");

      // variable untuk menampung hasil cipher sementara
      var text = "";

      // melakukan perulangan terhadap susunan huruf
      for (let index2 = 0; index2 < charSpace.length; index2++) {
        // fungsinya mengubah index menjadi value
        const charSplit = charSpace[index2];

        // fungsinya untuk mengecek ketersediaan value didalam array alphabet
        var x = splitAlphabet.indexOf(charSplit);

        // proses melakukan encrypt / decrypt
        var ex = x % 26;
        if (ex >= 13) {
          text += splitAlphabet[ex - 13];
        } else {
          text += splitAlphabet[ex + 13];
        }
      }

      // melakukan push array
      dummyCipher.push(text);
    }

    // mengembalikan hasil
    return dummyCipher.toString().replaceAll(",", " ").toLowerCase();
  };

  // aksi button Encrypt
  const buttonEncrypt = () => {
    var value = refPlainText.current.value;
    if (value === "") {
      alert("The column is empty!!!");
    } else {
      setCipherText(encryptROT13(value));
    }
  };

  // aksi button Decrypt
  const buttonDecrypt = () => {
    var value = refCipherText.current.value;
    if (value === "") {
      alert("The column is empty!!!");
    } else {
      setPlainText(encryptROT13(value));
    }
  };

  return (
    <div className='w-full h-screen bg-red-800'>
      <div className='flex flex-col items-center text-slate-100 py-6'>
        <h1 className='text-3xl font-semibold'>ROT13 CIPHER</h1>
        <div className='flex flex-row space-x-12'>
          <div className='flex-1'>
            <div className='flex flex-col space-y-4 w-96 mt-6'>
              <label className='font-semibold text-lg'>Plain text</label>
              <textarea
                className='rounded-md placeholder:text-slate-300 px-2 py-2 text-slate-900 focus:outline-none'
                rows={4}
                placeholder='type your plain text ...'
                cols={6}
                ref={refPlainText}
              ></textarea>
              <button
                onClick={() => buttonEncrypt()}
                className='mr-auto bg-black font-semibold px-3 py-2 rounded-md'
              >
                Encrypt
              </button>
              {/* Chiper Text Holder */}
              <p
                className={`bg-red-700 px-2 py-0.5 rounded ${
                  cipherText === null ? "hidden" : "flex"
                }`}
              >
                {cipherText}
              </p>
            </div>
          </div>
          <div className='flex-1'>
            <div className='flex flex-col space-y-4 w-96 mt-6'>
              <label className='font-semibold text-lg'>Cipher text</label>
              <textarea
                className='rounded-md placeholder:text-slate-300 px-2 py-2 text-slate-900 focus:outline-none'
                rows={4}
                placeholder='paste your chiper text ...'
                cols={6}
                ref={refCipherText}
              ></textarea>
              <button
                onClick={() => buttonDecrypt()}
                className='mr-auto bg-black font-semibold px-3 py-2 rounded-md'
              >
                Decrypt
              </button>
              {/* Plain Text Text Holder */}
              <p
                className={`bg-red-700 px-2 py-0.5 rounded ${
                  plaintText === null ? "hidden" : "flex"
                }`}
              >
                {plaintText}
              </p>
            </div>
          </div>
        </div>
        <h6 className='mt-32 text-sm font-light italic'>
          © Mulia University Balikpapan.
        </h6>
      </div>
    </div>
  );
}

export default App;
