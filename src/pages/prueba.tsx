import { useState } from 'react';
import axios from 'axios';

export default function Prueba() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [files, setFiles] = useState<any>([]);

  const resetStates = () => {
    setName('');
    setAuthor('');
    setFiles([]);
  };

  const enviarDatos = async (e:any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('author', author);

    for (const file of files) {
      formData.append('files', file);
    }

    try {
      const response = await axios.post('/api/prueba', formData);
      console.log(response.data);
      resetStates();
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const onFileChange = (e:any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles([...files, e.target.files[0]]);
    }
  };

  return (
    <div>
      <h1>Libros</h1>
      <form onSubmit={enviarDatos}>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={author}
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input type="file" accept="image/*, video/*" onChange={onFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
