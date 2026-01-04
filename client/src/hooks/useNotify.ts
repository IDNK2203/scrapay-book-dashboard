import { toaster } from "../theme/toaster"

export const useNotify = () => {
  const success = (title: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "success",
      duration: 3000,
      // action: {
      //   label: "X",
      //   onClick: () => {},
      // },
    })
  }

  const error = (title: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "error",
      duration: 5000,
      // action: {
      //   label: "X",
      //   onClick: () => {},
      // },
    })
  }

  const info = (title: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "info",
      duration: 3000,
    })
  }

  return { success, error, info }
}
