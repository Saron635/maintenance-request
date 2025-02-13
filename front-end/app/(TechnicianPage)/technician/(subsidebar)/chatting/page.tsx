import Image from "next/image";

const ChattingPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-300 shadow-md rounded-lg p-6">

  <div className="flex items-center justify-between mb-4">
    <button
      className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
   
    >
        Private Chat
      
    </button>
    <button
      className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
    
    >
      Group Chat
    </button>
  </div>
  

  <div className="flex flex-col bg-gray-200 overflow-y-auto p-4 rounded-xl h-96">

    <div className="flex justify-center items-center mb-4 space-x-2">
      <div className="relative">
        <Image
          className="w-10 h-10 rounded-full"
          src="/avatar.png"
          alt="User Avatar"
          width={60}
          height={60}
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
      </div>
      <div className="relative">
        <Image
          className="w-10 h-10 rounded-full"
          src="/avatar.png"
          alt="User Avatar"
          width={60}
          height={60}
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-red-400 border-2 border-white rounded-full"></span>
      </div>
      <div className="relative">
        <Image
          className="w-10 h-10 rounded-full"
          src="/avatar.png"
          alt="User Avatar"
          width={60}
          height={60}
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400 border-2 border-white rounded-full"></span>
      </div>
      <a
        className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600"
        href="#"
      >
        +99
      </a>
    </div>


    <div className="flex flex-col space-y-4 mb-4">
  
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            className="w-10 h-10 rounded-full"
            src="/avatar.png"
            alt="User Avatar"
            width={60}
            height={60}
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-xs">
          <div className="font-medium ">Abebe Belete</div>
          <div className="text-sm ">Just finished the job</div>
        </div>
      </div>
   
      <div className="flex items-start space-x-4">
        <Image
          className="w-10 h-10 rounded-full"
          src="/avatar.png"
          alt="User Avatar"
          width={60}
          height={60}
        />
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-xs">
          <div className="font-medium">Kebede Abebe</div>
          <div className="text-sm">Just finished the job</div>
        </div>
        
      </div>
    </div>

    
    
  </div>
</div>
{/* 
dfgasgasga
dfgasgasga
dfgasgasga
dfgasgasga
dfgasgasga */}
            <div className="bg-slate-300 shadow-md rounded-lg p-6 flex flex-col ">
                <h2 className="text-lg font-bold mb-4 text-white text-center">Chatting Section</h2>
                
  
  

  <div className="flex flex-col bg-gray-200 overflow-y-auto p-4 rounded-xl h-96">

        <div className="flex items-center mb-4 space-x-2 bg-blue-500 rounded-lg">
 
           


            <div className="flex-1">
                <h2 className="text-lg font-bold mb-4 text-black text-center mt-3">
                Chatting with Technician Belete
                </h2>
            </div>
            <div className="flex items-center space-x-2">
                <Image
                className="w-10 h-10 rounded-full"
                src="/avatar.png"
                alt="User Avatar"
                width={60}
                height={60}
                />
                <div className="flex flex-col">
                <span className="text-green-500 font-medium mr-2">Online</span>
                </div>
            </div>
        </div>

    <div className="flex flex-col space-y-4 mb-4">
  
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            className="w-10 h-10 rounded-full"
            src="/avatar.png"
            alt="User Avatar"
            width={60}
            height={60}
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
          <div className="font-medium text-gray-800">Abebe Belete</div>
          <div className="text-sm text-gray-500">How is the Job going</div>
        </div>
      </div>
   
      <div className="flex items-start space-x-4 justify-end">
        
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-xs">
          <div className="font-medium">Kebede Abebe</div>
          <div className="text-sm">Just finished the job</div>
        </div>
        <Image
          className="w-10 h-10 rounded-full"
          src="/avatar.png"
          alt="User Avatar"
          width={60}
          height={60}
        />
      </div>
    </div>

    
    <div className="flex items-center mt-auto">
      <input
        className="w-full border rounded-full py-2 px-4 mr-2 text-gray-700"
        type="text"
        placeholder="Type your message..."
      />
      <button
        className="bg-blue-500 text-white font-medium py-2 px-4 rounded-full hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  </div>
            </div>

        </div>
    );
}

export default ChattingPage;
