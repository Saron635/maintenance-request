import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2Icon } from 'lucide-react';
interface HelpDesk {
  id: number;
  title: string;
  video_url: string;
  description: string;
  solution_id: number;
}

const HelpDeskForm = () => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [helpDeskEntries, setHelpDeskEntries] = useState<HelpDesk[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get('http://localhost:3002/api/avaliableHelpDesk/getHelpDeskLists')
      .then((response) => setHelpDeskEntries(response.data))
      .catch((error) => {
        console.error(error.message);
        toast.error('Error fetching help desk entries:' + error.message);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const textareaElement = document.getElementById(
      'description'
    ) as HTMLTextAreaElement;
    const textAreaValue = textareaElement.value;

    const lines = textAreaValue.split('\n');

    // to change to JSON (object) format
    const descriptionJson = lines
      .filter((line) => line.trim() !== '') // Remove empty lines
      .map((line) => {
        const parts = line.trim().split('.');
        const order = parseInt(parts[0].trim());

        // Check if order is a valid number and the rest of the text is not empty
        if (!isNaN(order) && parts.length > 1) {
          return {
            order: order,
            texts: parts.slice(1).join('.').trim(),
          };
        }
        return null; // Invalid line format
      })
      .filter((step) => step !== null);

    const data = {
      title: title,
      video_url: videoUrl,
      description: JSON.stringify(descriptionJson),
    };

    try {
      await axios.post(
        'http://localhost:3002/api/helpDeskEntry/helpDeskEntryController',
        data
      );
      toast.success('Added successfully');
      window.location.reload();
      setShowForm(false); // Hide form after submission
      window.location.reload();
    } catch (error: any) {
      toast.error('Something went wrong ' + error.message);
      window.location.reload();
    }

    setTitle('');
    setVideoUrl('');
    setDescription('');
  };

  const handleHelpDeskRemove = async (id: number) => {
    console.log(id);
    try {
      await axios.delete(
        `http://localhost:3002/api/helpDeskEntry/handleHelpDeskRemove/${id}`
      );

      // Remove entry from local state
      setHelpDeskEntries(helpDeskEntries.filter((entry) => entry.id !== id));

      toast.success('Removed successfully');
      window.location.reload();
    } catch (error: any) {
      toast.error('Something went wrong ' + error.message);
    }
  };

  return (
    <>
      <div className="max-w-3xl md:mx-auto p-4 md:p-6 md:pl-64">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">
              Help Desk Entries
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {showForm ? 'Close Form' : 'Add New Entry'}
            </button>
          </div>
          {message && (
            <div
              className={`mb-4 p-2 rounded text-center ${
                message.includes('successfully')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="videoUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video URL
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Please enter step by step description using the following format
                1. First step
                2. Second step
                3. Third step..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Help Desk
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="bg-gray-100 justify-center shadow-lg md:pl-64 rounded-lg p-4 md:p-8 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl md:mx-auto">
        {helpDeskEntries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              {entry.title}
            </h2>
            <ul className="m-4 space-y-1">
              {entry.description.map((step) => (
                <li
                  key={step.order}
                  className="text-sm md:text-base text-gray-700"
                >
                  <span className="font-semibold">{step.order}</span>.{' '}
                  {step.texts}
                </li>
              ))}
            </ul>
            <div className="flex flex-row space-x-8">
              <a
                href={entry.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline bg-gray-100 px-4 py-2 mt-4 block rounded-lg hover:shadow-lg transform hover:transition-transform hover:translate-y-1"
              >
                Watch Video
              </a>
              <div className="flex items-center mt-2">
                <button onClick={() => handleHelpDeskRemove(entry.solution_id)}>
                  <Trash2Icon className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default HelpDeskForm;
