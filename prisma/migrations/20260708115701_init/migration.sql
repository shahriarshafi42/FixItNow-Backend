-- CreateIndex
CREATE INDEX "Availability_technicianId_idx" ON "Availability"("technicianId");

-- CreateIndex
CREATE INDEX "Booking_customerId_idx" ON "Booking"("customerId");

-- CreateIndex
CREATE INDEX "Booking_technicianId_idx" ON "Booking"("technicianId");

-- CreateIndex
CREATE INDEX "Payment_bookingId_idx" ON "Payment"("bookingId");

-- CreateIndex
CREATE INDEX "Review_technicianId_idx" ON "Review"("technicianId");

-- CreateIndex
CREATE INDEX "Review_customerId_idx" ON "Review"("customerId");

-- CreateIndex
CREATE INDEX "Review_bookingId_idx" ON "Review"("bookingId");

-- CreateIndex
CREATE INDEX "Service_technicianId_idx" ON "Service"("technicianId");

-- CreateIndex
CREATE INDEX "technicalProfiles_userId_idx" ON "technicalProfiles"("userId");
