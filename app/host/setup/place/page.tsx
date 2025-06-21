"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Home, Building, TreePine, Coffee, Hotel, Minus, Plus } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function TellUsAboutPlacePage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPropertyType, setSelectedPropertyType] = useState("")
  const [guestCounts, setGuestCounts] = useState({
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  })
  const [location, setLocation] = useState({
    country: "Nepal",
    address: "",
    city: "",
    province: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const propertyTypes = [
    {
      id: "apartment",
      title: t("apartment"),
      description: "A place within a multi-unit residential building",
      icon: Building,
    },
    {
      id: "house",
      title: t("house"),
      description: "A residential building, usually for one family",
      icon: Home,
    },
    {
      id: "secondary-unit",
      title: t("secondaryUnit"),
      description: "A private unit that's part of a larger property",
      icon: Home,
    },
    {
      id: "unique-space",
      title: t("uniqueSpace"),
      description: "A space that's not typically used for accommodation",
      icon: TreePine,
    },
    {
      id: "bed-breakfast",
      title: t("bedAndBreakfast"),
      description: "A small lodging establishment with breakfast included",
      icon: Coffee,
    },
    {
      id: "boutique-hotel",
      title: t("boutique"),
      description: "A small, stylish hotel with unique character",
      icon: Hotel,
    },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to next major step
      window.location.href = "/host/setup/standout"
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      window.location.href = "/host/setup"
    }
  }

  const updateCount = (key: keyof typeof guestCounts, increment: boolean) => {
    setGuestCounts((prev) => ({
      ...prev,
      [key]: Math.max(1, prev[key] + (increment ? 1 : -1)),
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whichDescribes")}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {propertyTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedPropertyType === type.id ? "ring-2 ring-purple-600 bg-purple-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedPropertyType(type.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-gray-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                          <p className="text-gray-600 text-sm">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whereLocated")}</h1>
              <p className="text-gray-600">Your address is only shared with guests after they book.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country/Region</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={location.country}
                        onChange={(e) => setLocation({ ...location, country: e.target.value })}
                      >
                        <option>Nepal</option>
                        <option>India</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street address</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your address"
                        value={location.address}
                        onChange={(e) => setLocation({ ...location, address: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="City"
                          value={location.city}
                          onChange={(e) => setLocation({ ...location, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Province"
                          value={location.province}
                          onChange={(e) => setLocation({ ...location, province: e.target.value })}
                        />
                      </div>
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("shareBasics")}</h1>
              <p className="text-gray-600">You'll add more details later, like bed types, photos, and amenities.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {[
                      { label: t("guests"), key: "guests" as keyof typeof guestCounts },
                      { label: t("bedrooms"), key: "bedrooms" as keyof typeof guestCounts },
                      { label: t("beds"), key: "beds" as keyof typeof guestCounts },
                      { label: t("bathrooms"), key: "bathrooms" as keyof typeof guestCounts },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-lg font-medium">{item.label}</span>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10"
                            onClick={() => updateCount(item.key, false)}
                            disabled={guestCounts[item.key] <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-lg font-medium w-8 text-center">{guestCounts[item.key]}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10"
                            onClick={() => updateCount(item.key, true)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Review your place details</h1>
              <p className="text-gray-600">Make sure everything looks correct before moving to the next step.</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Property Type</h3>
                  <p className="text-gray-600">
                    {propertyTypes.find((type) => type.id === selectedPropertyType)?.title || "Not selected"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Location</h3>
                  <div className="text-gray-600">
                    <p>{location.address}</p>
                    <p>
                      {location.city}, {location.province}
                    </p>
                    <p>{location.country}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Capacity</h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <p>{guestCounts.guests} guests</p>
                    <p>{guestCounts.bedrooms} bedrooms</p>
                    <p>{guestCounts.beds} beds</p>
                    <p>{guestCounts.bathrooms} bathrooms</p>
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
            <div className="text-sm text-gray-600">{t("tellUsAboutPlace")}</div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {t("stepOf").replace("{current}", currentStep.toString()).replace("{total}", totalSteps.toString())}
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
              {t("back")}
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedPropertyType) ||
                (currentStep === 2 && (!location.address || !location.city))
              }
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
            >
              {currentStep === totalSteps ? "Continue to Make it Stand Out" : t("next")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
