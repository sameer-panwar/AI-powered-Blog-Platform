export default function Profile() {
    return (
        <div>
             <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border">
                <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                    JD
                    </div>

                    <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                    <p className="text-gray-500">@john_doe</p>
                    <p className="text-purple-600 font-medium mt-1">
                        Senior Frontend Developer & Tech Writer
                    </p>
                    <p className="text-gray-600 mt-2">
                        Passionate about building user-friendly web applications and
                        sharing knowledge through writing. Love exploring new technologies
                        and helping others learn to code. Coffee enthusiast ☕
                    </p>

                    <div className="flex items-center space-x-6 mt-4 font-semibold">
                        <div>
                        <p className="text-lg text-gray-900">1.2K</p>
                        <p className="text-gray-500 text-sm">Followers</p>
                        </div>
                        <div>
                        <p className="text-lg text-gray-900">389</p>
                        <p className="text-gray-500 text-sm">Following</p>
                        </div>
                        <div>
                        <p className="text-lg text-gray-900">42</p>
                        <p className="text-gray-500 text-sm">Posts</p>
                        </div>
                        <div>
                        <p className="text-lg text-gray-900">125.4K</p>
                        <p className="text-gray-500 text-sm">Views</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4">
                        <HiOutlineLocationMarker className="text-lg" />
                        <span>San Francisco, CA</span>
                        <BiLink className="text-lg" />
                        <a href="https://johndoe.dev" className="text-purple-600 hover:underline">
                        johndoe.dev
                        </a>
                        <HiOutlineCalendar className="text-lg" />
                        <span>Joined March 2022</span>
                    </div>

                    <div className="flex space-x-3 mt-4">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded font-medium">
                        Follow
                        </button>
                        <div className="flex items-center space-x-2 ml-auto text-gray-600">
                        <FaTwitter className="hover:text-purple-600 cursor-pointer" />
                        <FaLinkedin className="hover:text-purple-600 cursor-pointer" />
                        <FaGithub className="hover:text-purple-600 cursor-pointer" />
                        <FaEnvelope className="hover:text-purple-600 cursor-pointer" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}