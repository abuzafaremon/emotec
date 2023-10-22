import { Dialog, Transition } from "@headlessui/react";
import { doc, updateDoc } from "firebase/firestore";
import { Fragment, useState } from "react";
import { db } from "../../firebase.init";
import SmLoading from "../Loading/SmLoading";
import JoditEditor from "jodit-react";

export default function UpdatePost({ isOpen, setIsOpen, closeModal, post }) {
  const [title, setTitle] = useState(post.title);
  const [postText, setPostText] = useState(post.postText);
  const [price, setPrice] = useState(post.price);
  const [loading, setLoading] = useState(false);
  const updatePost = async () => {
    setLoading(true);

    const postRef = doc(db, "posts", post.id);
    // Update the post
    await updateDoc(postRef, {
      title,
      postText,
      price,
    });

    setLoading(false);
    setIsOpen(false);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Hey, {post?.author?.name} Update Your Post
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="w-full">
                        <div className="grid gap-2 py-3">
                          <div className="form-control">
                            <input
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                              type="text"
                              placeholder="Update Title..."
                              required
                              className="input input-bordered"
                            />
                          </div>
                          <div className="form-control">
                            <input
                              onChange={(e) => setPrice(e.target.value)}
                              value={price}
                              type="number"
                              placeholder="Update Price..."
                              required
                              className="input input-bordered"
                            />
                          </div>
                          <div className="form-control">
                            <JoditEditor
                              value={postText}
                              onChange={(content) => setPostText(content)}
                            />
                          </div>
                          <div className="form-control">
                            {/* <span>{error?.messages}</span> */}
                            {loading ? (
                              <button className="btn">
                                <SmLoading />
                              </button>
                            ) : (
                              <button className="btn" onClick={updatePost}>
                                Update Post
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn btn-sm btn-error"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
