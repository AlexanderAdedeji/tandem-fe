import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Edit2, Plus, Trash2 } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { useThemeCustomization } from '@/shared/context/ThemeCustomisationContext'
interface ColorEditModalProps {
  color: string
  label: string
  onClose: () => void
  onSave: (color: string) => void
}
const ColorEditModal: React.FC<ColorEditModalProps> = ({
  color,
  label,
  onClose,
  onSave,
}) => {
  const [selectedColor, setSelectedColor] = useState(color)
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{
          scale: 0.95,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          scale: 0.95,
        }}
        className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4 w-72"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Edit {label}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="mb-4">
          <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-[#2E2E2E] dark:text-[#E9E9E9]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(selectedColor)
              onClose()
            }}
            className="flex-1 py-2 px-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
interface ColorPaletteSelectorProps {
  onClose: () => void
}
const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({
  onClose,
}) => {
  const {
    colorPalettes,
    selectedPalette,
    setColorPalette,
    addCustomPalette,
    updateCustomPalette,
    deleteCustomPalette,
  } = useThemeCustomization()
  const [editingColor, setEditingColor] = useState<{
    type: 'primary' | 'secondary' | 'accent'
    color: string
  } | null>(null)
  const [isCreatingCustom, setIsCreatingCustom] = useState(false)
  const [customName, setCustomName] = useState('')
  const handleColorEdit = (type: 'primary' | 'secondary' | 'accent') => {
    setEditingColor({
      type,
      color:
        type === 'primary'
          ? selectedPalette.primary
          : type === 'secondary'
            ? selectedPalette.secondary
            : selectedPalette.accent,
    })
  }
  const handleColorSave = (color: string) => {
    if (!editingColor) return
    const updatedPalette = {
      ...selectedPalette,
      [editingColor.type]: color,
      [`dark${editingColor.type.charAt(0).toUpperCase()}${editingColor.type.slice(1)}`]:
        color,
    }
    if (selectedPalette.isCustom) {
      updateCustomPalette(updatedPalette)
    } else {
      addCustomPalette({
        ...updatedPalette,
        id: `custom-${Date.now()}`,
        name: `${selectedPalette.name} (Custom)`,
        isCustom: true,
      })
    }
  }
  const handleCreateCustom = () => {
    if (!customName.trim()) return
    addCustomPalette({
      id: `custom-${Date.now()}`,
      name: customName,
      primary: '#5855FF',
      secondary: '#2B2C5D',
      accent: '#FF914D',
      darkPrimary: '#FF914D',
      darkSecondary: '#2B2C5D',
      darkAccent: '#5855FF',
      label: 'Custom palette',
      isCustom: true,
    })
    setIsCreatingCustom(false)
    setCustomName('')
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center"
      >
        <motion.div
          initial={{
            y: '100%',
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: '100%',
          }}
          className="bg-white dark:bg-[#2B2C5D] w-full sm:w-96 sm:rounded-xl max-h-[80vh] overflow-y-auto"
        >
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Choose Theme
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {!isCreatingCustom ? (
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => setIsCreatingCustom(true)}
                className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400"
              >
                <Plus size={20} className="mr-2" />
                Create Custom Theme
              </motion.button>
            ) : (
              <div className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter theme name"
                  className="w-full p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCreatingCustom(false)}
                    className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateCustom}
                    className="flex-1 py-2 px-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
            {colorPalettes.map((palette) => (
              <motion.div
                key={palette.id}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="w-full p-4 rounded-xl border-2 transition-colors"
                style={{
                  borderColor:
                    selectedPalette.id === palette.id
                      ? palette.primary
                      : 'transparent',
                  backgroundColor:
                    selectedPalette.id === palette.id
                      ? `${palette.primary}10`
                      : 'transparent',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
                      {palette.name}
                    </h4>
                    <p className="text-sm text-[#666] dark:text-[#AAA]">
                      {palette.label}
                    </p>
                  </div>
                  {selectedPalette.id === palette.id && (
                    <Check
                      size={20}
                      style={{
                        color: palette.primary,
                      }}
                      className="ml-4"
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setColorPalette(palette.id)
                      if (selectedPalette.id === palette.id) {
                        handleColorEdit('primary')
                      }
                    }}
                    className="flex-1 h-10 rounded-lg relative group"
                    style={{
                      backgroundColor: palette.primary,
                    }}
                  >
                    {selectedPalette.id === palette.id && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 rounded-lg">
                        <Edit2 size={16} className="text-white" />
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setColorPalette(palette.id)
                      if (selectedPalette.id === palette.id) {
                        handleColorEdit('secondary')
                      }
                    }}
                    className="flex-1 h-10 rounded-lg relative group"
                    style={{
                      backgroundColor: palette.secondary,
                    }}
                  >
                    {selectedPalette.id === palette.id && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 rounded-lg">
                        <Edit2 size={16} className="text-white" />
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setColorPalette(palette.id)
                      if (selectedPalette.id === palette.id) {
                        handleColorEdit('accent')
                      }
                    }}
                    className="flex-1 h-10 rounded-lg relative group"
                    style={{
                      backgroundColor: palette.accent,
                    }}
                  >
                    {selectedPalette.id === palette.id && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 rounded-lg">
                        <Edit2 size={16} className="text-white" />
                      </div>
                    )}
                  </button>
                </div>
                {palette.isCustom && (
                  <button
                    onClick={() => deleteCustomPalette(palette.id)}
                    className="mt-2 w-full py-1 px-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 size={14} className="inline mr-1" />
                    Delete Custom Theme
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <AnimatePresence>
          {editingColor && (
            <ColorEditModal
              color={editingColor.color}
              label={`${editingColor.type.charAt(0).toUpperCase()}${editingColor.type.slice(1)} Color`}
              onClose={() => setEditingColor(null)}
              onSave={handleColorSave}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}



export default ColorPaletteSelector