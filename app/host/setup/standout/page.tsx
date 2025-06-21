"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Wifi,
  Car,
  ChefHat,
  Waves,
  Snowflake,
  Tv,
  Dumbbell,
  Coffee,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function MakeItStandOutPage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [photos, setPhotos] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [pricing, setPricing] = useState({
    basePrice: "",
    cleaningFee: "",
    securityDeposit: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const amenities = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "parking", label: "Free parking", icon: Car },
    { id: "kitchen", label: "Kitchen", icon: ChefHat },
    { id: "pool", label: "Pool", icon: Waves },
    { id: "ac", label: "Air conditioning", icon: Snowflake },
    { id: "tv", label: "TV", icon: Tv },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "breakfast", label: "Breakfast", icon: Coffee },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      window.location.href = "/host/setup/ready"
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      window.location.href = "/host/setup/place"
    }
  }

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhoto = `/placeholder.svg?height=200&width=300&text=Photo${photos.length + 1}`
    setPhotos([...photos, newPhoto])
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Add photos of your place</h1>
              <p className="text-gray-600">Photos help guests imagine staying at your place. You can add more later.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {photos.length < 5 && (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
                        onClick={handlePhotoUpload}
                      >
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Add photo</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    {photos.length}/5 photos • At least 1 photo required
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create your title and description</h1>
              <p className="text-gray-600">Help guests understand what makes your place special.</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Cozy apartment with mountain view"
                        className="mt-2"
                        maxLength={50}
                      />
                      <p className="text-sm text-gray-500 mt-1">{title.length}/50 characters</p>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your place, what makes it special, and what guests can expect..."
                        className="mt-2"
                        rows={6}
                        maxLength={500}
                      />
                      <p className="text-sm text-gray-500 mt-1">{description.length}/500 characters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What amenities do you offer?</h1>
              <p className="text-gray-600">Select all the amenities available to your guests.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {amenities.map((amenity) => {
                      const IconComponent = amenity.icon
                      const isSelected = selectedAmenities.includes(amenity.id)
                      return (
                        <div
                          key={amenity.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            isSelected ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleAmenityToggle(amenity.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox checked={isSelected} onChange={() => {}} />
                            <IconComponent className="w-5 h-5 text-gray-600" />
                            <span className="font-medium">{amenity.label}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Set your price</h1>
              <p className="text-gray-600">You can change your price anytime after publishing.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="basePrice">Base price per night</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">NPR</span>
                        <Input
                          id="basePrice"
                          type="number"
                          value={pricing.basePrice}
                          onChange={(e) => setPricing({ ...pricing, basePrice: e.target.value })}
                          placeholder="3500"
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cleaningFee">Cleaning fee (optional)</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">NPR</span>
                        <Input
                          id="cleaningFee"
                          type="number"
                          value={pricing.cleaningFee}
                          onChange={(e) => setPricing({ ...pricing, cleaningFee: e.target.value })}
                          placeholder="500"
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="securityDeposit">Security deposit (optional)</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">NPR</span>
                        <Input
                          id="securityDeposit"
                          type="number"
                          value={pricing.securityDeposit}
                          onChange={(e) => setPricing({ ...pricing, securityDeposit: e.target.value })}
                          placeholder="1000"
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Price breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base price</span>
                          <span>NPR {pricing.basePrice || "0"}</span>
                        </div>
                        {pricing.cleaningFee && (
                          <div className="flex justify-between">
                            <span>Cleaning fee</span>
                            <span>NPR {pricing.cleaningFee}</span>
                          </div>
                        )}
                        <div className="border-t pt-2 font-medium">
                          <div className="flex justify-between">
                            <span>Total per night</span>
                            <span>
                              NPR {(Number(pricing.basePrice) + Number(pricing.cleaningFee || 0)).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Kostra
            </Link>
            <div className="text-sm text-gray-600">Make it stand out</div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{renderStepContent()}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} className="rounded-full px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && photos.length === 0) ||
                (currentStep === 2 && (!title || !description)) ||
                (currentStep === 4 && !pricing.basePrice)
              }
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
            >
              {currentStep === totalSteps ? "Continue to Get Ready" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
